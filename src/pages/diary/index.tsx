import { Breadcrumb, Button, Table, type TableProps, notification } from 'antd';
import { DiaryItemType } from './type';
import { useEffect, useState } from 'react';
import diaryService from './index.service';
import { useNavigate } from 'react-router-dom';
import { IMGS_BASIC_URL } from '@myConstants/index';
import './index.less';

const Diary = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DiaryItemType[]>([]);

  const columns: TableProps<DiaryItemType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 200,
      key: 'id'
    },
    {
      title: '内容',
      dataIndex: 'content',
      ellipsis: true,
      key: 'content'
    },
    {
      title: '插图',
      dataIndex: 'imgs',
      key: 'imgs',
      width: 240,
      align: 'center',
      render: imgs => {
        return imgs.map((item: string, index: number) => {
          return (
            <div className="diary-img" key={index}>
              <img src={IMGS_BASIC_URL + '/' + item} alt="" />
            </div>
          );
        });
      }
    },
    {
      title: '发布时间',
      dataIndex: 'time',
      key: 'time',
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

  const getData = async () => {
    const res = await diaryService.getAll();
    if (res.success) {
      setData(res.data);
    }
  };

  const deleteData = async (id: string) => {
    const res = await diaryService.delete(id);
    if (res.success) {
      getData();
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="info-container">
      <h1>Diaries</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '日记管理' }]}
      />
      <Button
        style={{
          marginBottom: '20px'
        }}
        type="primary"
        onClick={() => {
          navigate(`/edit-diary/null`);
        }}
      >
        新增
      </Button>
      <Table rowKey={record => record.id} columns={columns} dataSource={data} />
    </div>
  );
};

export { Diary };
