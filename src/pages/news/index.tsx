import { Table, type TableProps, Switch, notification, Modal, Input, Button, Breadcrumb } from 'antd';
import { NewsType, AddNewsType } from './type';
import { useEffect, useState } from 'react';
import newsService from './index.service';

const News = () => {
  const [newsData, setNewsData] = useState<NewsType[]>([]);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [editNews, setEditNews] = useState<NewsType | null>(null);
  const [addNews, setAddNews] = useState<AddNewsType>({
    des: '',
    link: ''
  });

  const columns: TableProps<NewsType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 200,
      key: 'id'
    },
    {
      title: '内容',
      dataIndex: 'des',
      ellipsis: false,
      key: 'des'
    },
    {
      title: '链接地址',
      dataIndex: 'link',
      key: 'link'
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      width: 180,
      key: 'time'
    },
    {
      title: '显示',
      dataIndex: 'show',
      key: 'show',
      width: 80,
      render: (show, record) => {
        return (
          <Switch
            checked={show}
            onChange={e => {
              const news = { ...record, show: e };
              updateNews(news);
            }}
          />
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: record => {
        return (
          <div className="table-action">
            <a
              onClick={() => {
                setEditNews(record);
                showEditModal();
              }}
            >
              编辑
            </a>
            <a
              onClick={() => {
                const res = window.confirm('确定删除吗?');
                if (res) {
                  deleteDate(record.id);
                } else {
                  return;
                }
              }}
            >
              删除
            </a>
          </div>
        );
      }
    }
  ];

  const getAllNews = async () => {
    const res = await newsService.getAllNews();
    if (res.success) {
      setNewsData(res.data);
    }
  };

  const updateNews = async (news: NewsType) => {
    const res = await newsService.updateNews(news);
    if (res.success) {
      getAllNews();
      notification.success({ message: '更新状态成功' });
    } else {
      notification.error({ message: '更新状态失败' });
    }
    setEditIsModalOpen(false);
  };

  const deleteDate = async (id: string) => {
    console.log(id);
    const res = await newsService.deleteNews(id);
    if (res.success) {
      getAllNews();
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
    }
  };

  const addNewsAction = async () => {
    const res = await newsService.addNews(addNews);
    if (res.success) {
      getAllNews();
      handleAddCancel();
      notification.success({ message: '新增成功' });
    } else {
      notification.error({ message: '新增失败' });
    }
    setAddIsModalOpen(false);
  };

  const showEditModal = () => {
    setEditIsModalOpen(true);
  };
  const showAddModal = () => {
    setAddIsModalOpen(true);
  };

  const handleEditOk = () => {
    if (!editNews) return;
    updateNews(editNews);
  };

  const handleADDOk = () => {
    addNewsAction();
  };

  const handleEditCancel = () => {
    setEditIsModalOpen(false);
  };

  const handleAddCancel = () => {
    setAddNews({ des: '', link: '' });
    setAddIsModalOpen(false);
  };

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <div className="info-container">
      <h1>News</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '新闻管理' }]}
      />
      <Button
        style={{
          marginBottom: '20px'
        }}
        type="primary"
        onClick={() => {
          showAddModal();
        }}
      >
        新增
      </Button>
      <Table bordered rowKey={record => record.id} dataSource={newsData} columns={columns} />
      {editNews && (
        <Modal
          title="编辑新闻"
          okText="提交"
          cancelText="取消"
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <div className="modal-item">
            <span>des: </span>
            <Input
              defaultValue={editNews.des}
              onChange={e => {
                setEditNews({ ...editNews, des: e.target.value });
              }}
            />
          </div>
          <div className="modal-item">
            <span>link: </span>
            <Input defaultValue={editNews.link} onChange={e => setEditNews({ ...editNews, link: e.target.value })} />
          </div>
        </Modal>
      )}
      <Modal
        title="新增新闻"
        okText="提交新增"
        cancelText="取消新增"
        open={isAddModalOpen}
        onOk={handleADDOk}
        onCancel={handleAddCancel}
      >
        <div className="modal-item">
          <span>des: </span>
          <Input
            value={addNews.des}
            onChange={e => {
              setAddNews({ ...addNews, des: e.target.value });
            }}
          />
        </div>
        <div className="modal-item">
          <span>link: </span>
          <Input value={addNews.link} onChange={e => setAddNews({ ...addNews, link: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
};

export { News };
