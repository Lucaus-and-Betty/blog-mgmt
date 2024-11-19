import { LoveListItemType } from './type';
import { Button, Breadcrumb, Table, type TableProps, notification, Modal, Input, Switch } from 'antd';
import loveService from './index.service';
import { useEffect, useState } from 'react';

const Love = () => {
  const [data, setData] = useState<LoveListItemType[]>([]);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [addData, setAddData] = useState<LoveListItemType>({
    id: '',
    title: '',
    done: false,
    publishTime: ''
  });
  const [editData, setEditData] = useState<LoveListItemType | null>(null);

  const columns: TableProps<LoveListItemType>['columns'] = [
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
      ellipsis: false,
      key: 'des'
    },
    {
      title: '完成度',
      dataIndex: 'done',
      key: 'done',
      width: 100,
      render: (donw, record) => {
        return (
          <Switch
            checked={donw}
            onChange={e => {
              const project = { ...record, done: e };
              console.log(project);
              updateData(project);
            }}
          />
        );
      }
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      width: 180,
      key: 'publishTime'
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

  const getAllData = async () => {
    const res = await loveService.getAll();
    if (res.success) {
      setData(res.data);
    }
  };

  const deleteData = async (id: string) => {
    const res = await loveService.delete(id);
    if (res.success) {
      getAllData();
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
    }
  };

  const addDataAction = async () => {
    const res = await loveService.add(addData);
    if (res.success) {
      getAllData();
      handleAddCancel();
      notification.success({ message: '新增成功' });
    } else {
      notification.error({ message: '新增失败' });
    }
    setAddIsModalOpen(false);
  };

  const updateData = async (loveListItem: LoveListItemType) => {
    const res = await loveService.update(loveListItem);
    if (res.success) {
      getAllData();
      handleEditCancel();
      notification.success({ message: '更新状态成功' });
    } else {
      notification.error({ message: '更新状态失败' });
    }
    setEditIsModalOpen(false);
  };

  const handleADDOk = () => {
    addDataAction();
  };

  const handleEditOk = () => {
    updateData(editData!);
  };

  const handleAddCancel = () => {
    setAddData({
      id: '',
      title: '',
      done: false,
      publishTime: ''
    });
    setAddIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditData(null);
    setEditIsModalOpen(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="info-container">
      <h1>Love</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '恋爱管理' }]}
      />
      <Button
        style={{
          marginBottom: '20px'
        }}
        type="primary"
        onClick={() => setAddIsModalOpen(true)}
      >
        新增
      </Button>
      <Table bordered rowKey={record => record.id} columns={columns} dataSource={data} />
      {editData && (
        <Modal
          title="编辑恋爱完成项"
          okText="提交新增"
          cancelText="取消新增"
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
        title="新增恋爱完成项"
        okText="提交新增"
        cancelText="取消新增"
        open={isAddModalOpen}
        onOk={handleADDOk}
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

export { Love };
