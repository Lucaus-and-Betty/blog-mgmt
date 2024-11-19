import { Breadcrumb, Button, notification, type TableProps, Table } from 'antd';
import { useEffect, useState } from 'react';
import articleService from './index.service';
import { ArticleInfoType, LabelsType } from './type';
import { IMGS_BASIC_URL } from '@myConstants/index';
import { useNavigate } from 'react-router-dom';
import './index.less';

const Article = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ArticleInfoType[]>([]);

  const columns: TableProps<ArticleInfoType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 150,
      key: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      key: 'title'
    },
    {
      title: '描述',
      dataIndex: 'des',
      key: 'des',
      align: 'center'
    },
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      align: 'center',
      width: 240,
      render: cover => {
        return (
          <div className="article-cover">
            <img src={IMGS_BASIC_URL + '/' + cover} alt="" />
          </div>
        );
      }
    },
    {
      title: '标签',
      dataIndex: 'labels',
      key: 'labels',
      align: 'center',
      width: 120,
      render: labels => {
        return (
          <div>
            {labels.map((item: LabelsType, index: number) => {
              return <div key={index}>{item.title}</div>;
            })}
          </div>
        );
      }
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'createTime',
      align: 'center',
      width: 120
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align: 'center',
      width: 120
    },
    {
      title: '阅读量',
      dataIndex: 'readCount',
      key: 'readCount',
      align: 'center',
      width: 80
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      align: 'center',
      render: record => {
        return (
          <div className="table-action">
            <a onClick={() => navigate(`/edit-article/${record.id}`)}>编辑</a>
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

  const deleteData = async (id: string) => {
    const res = await articleService.delete(id);
    if (res.success) {
      getData();
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
    }
  };

  const getData = async () => {
    const res = await articleService.getAll();
    if (res.success) {
      setData(res.data);
    } else {
      notification.error({ message: '获取失败' });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="info-container">
      <h1>Article</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '文章管理' }]}
      />
      <Button
        style={{
          marginBottom: '20px'
        }}
        type="primary"
        onClick={() => navigate('/edit-article/null')}
      >
        新增
      </Button>
      <Table bordered rowKey={row => row.id} columns={columns} dataSource={data} />
    </div>
  );
};

export { Article };
