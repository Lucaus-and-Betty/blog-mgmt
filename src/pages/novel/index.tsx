import { Button, Breadcrumb, Table, type TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { NovelType, ChapterListItemType } from './type';
import novelService from './index.service';
import { useParams, useNavigate } from 'react-router-dom';

const Novel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [novelInfo, setNovelInfo] = useState<NovelType | null>(null);
  const [data, setData] = useState<ChapterListItemType[]>([]);

  const columns: TableProps<ChapterListItemType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 200,
      key: 'id'
    },
    {
      title: '上一章 ID',
      dataIndex: 'previousId',
      ellipsis: true,
      width: 200,
      key: 'previousId'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '章节排序',
      dataIndex: 'order',
      key: 'order',
      // 局中
      align: 'center',
      width: 100
    },
    {
      title: '发布时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: 120
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      align: 'center',
      render: (__, record) => {
        return (
          <div className="table-action">
            <a
              onClick={() => {
                navigate(`/edit-novel/${record.id}?novelId=${id}`);
              }}
            >
              编辑
            </a>
          </div>
        );
      }
    }
  ];

  const getNovelInfo = async () => {
    const res = await novelService.getNovelInfo(id || '');
    if (res.success) {
      setNovelInfo(res.data);
    } else {
      setNovelInfo(null);
    }
  };

  const getData = async () => {
    const res = await novelService.getAllChapters(id || '');
    if (res.success) {
      setData(res.data);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    getNovelInfo();
    getData();
  }, []);

  return (
    <div className="info-container">
      <h1>Novels</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '小说管理' }, { title: novelInfo?.name }]}
      />
      {novelInfo && (
        <div className="novel-info">
          作者: {novelInfo.author}
          <br />
          <br />
          字数: {novelInfo.count}
          <br />
          <br />
          简介: {novelInfo.des}
        </div>
      )}
      <br />
      <Button
        style={{
          marginBottom: '20px'
        }}
        type="primary"
        onClick={() => {
          navigate(`/edit-novel/null?novelId=${id}`);
        }}
      >
        新增
      </Button>
      <Table bordered rowKey={record => record.id} columns={columns} dataSource={data} />
    </div>
  );
};

export { Novel };
