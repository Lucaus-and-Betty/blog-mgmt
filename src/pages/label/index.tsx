import { Breadcrumb, Button, Table, type TableProps, notification, Modal, Input } from 'antd';
import { LabelItemType, LabelItemAddType } from './type';
import { useEffect, useState } from 'react';
import labelService from './index.service';

const Label = () => {
  const [data, setData] = useState<LabelItemType[]>([]);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [addData, setAddData] = useState<LabelItemAddType>({
    title: ''
  });
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<LabelItemType | null>(null);

  const columns: TableProps<LabelItemType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 200,
      key: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      key: 'title'
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
      // 局中
      align: 'center',
      width: 120
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      align: 'center',
      render: record => {
        return (
          <div className="table-action">
            <a
              onClick={() => {
                setEditData(record);
                setEditIsModalOpen(true);
              }}
            >
              编辑
            </a>
            <a
              onClick={() => {
                const res = window.confirm('确定删除吗?');
                if (res) {
                  deleteData(record.id);
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

  const handleAddCancel = () => {
    setAddIsModalOpen(false);
    setAddData({
      title: ''
    });
  };

  const handleAddOk = async () => {
    const res = await labelService.add(addData.title);
    if (res.success) {
      setAddIsModalOpen(false);
      setAddData({
        title: ''
      });
      getAllData();
      notification.success({ message: '添加成功' });
    } else {
      notification.error({ message: '添加失败' });
    }
  };

  const handleEditCancel = () => {
    setEditData(null);
    setEditIsModalOpen(false);
  };

  const handleEditOk = async () => {
    if (!editData) return;
    const res = await labelService.update(editData.id, editData.title);
    if (res.success) {
      handleEditCancel();
      getAllData();
      notification.success({ message: '编辑成功' });
    } else {
      notification.error({ message: '编辑失败' });
    }
  };

  const getAllData = async () => {
    const res = await labelService.getAll();
    if (res.success) {
      setData(res.data);
    } else {
      notification.error({ message: '获取失败' });
    }
  };

  const deleteData = async (id: string) => {
    const res = await labelService.delete(id);
    if (res.success) {
      getAllData();
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="info-container">
      <h1>Label</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '文章标签管理' }]}
      />
      <Button
        style={{
          marginBottom: '20px'
        }}
        type="primary"
        onClick={() => {
          setAddIsModalOpen(true);
        }}
      >
        新增
      </Button>
      <Table rowKey={record => record.id} bordered columns={columns} dataSource={data} />
      {editData && (
        <Modal
          title="编辑标签"
          okText="提交编辑"
          cancelText="取消编辑"
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <div className="modal-item">
            <span>title: </span>
            <Input value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} />
          </div>
        </Modal>
      )}
      <Modal
        title="新增标签"
        okText="提交新增"
        cancelText="取消新增"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <div className="modal-item">
          <span>title: </span>
          <Input value={addData.title} onChange={e => setAddData({ ...addData, title: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
};

export { Label };
