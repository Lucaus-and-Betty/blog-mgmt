import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumb, Input, Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import editNovelService from './index.service';
import './index.less';

const { TextArea } = Input;

const EditNovel = () => {
  const { id } = useParams();
  const [searchRes] = useSearchParams();
  const novelId = searchRes.get('novelId');
  const [chapterName, setChapterName] = useState('');
  const [content, setContent] = useState('');

  const addChapter = async () => {
    const res = await editNovelService.addChapter({
      name: chapterName,
      novelId: novelId || '',
      content: content
    });
    if (res.success) {
      setChapterName('');
      setContent('');
      notification.success({ message: '新增成功' });
    } else {
      notification.error({ message: '新增失败' });
    }
  };

  const updateChapter = async () => {
    if (!id) {
      return;
    }
    const res = await editNovelService.updateChapter(id, content);
    if (res.success) {
      setChapterName('');
      setContent('');
      notification.success({ message: '更新成功' });
    } else {
      notification.error({ message: '更新失败' });
    }
  };

  const getChapterInfo = async () => {
    if (!id) {
      return;
    }
    const res = await editNovelService.getChapterInfo(id);
    if (res.success) {
      setChapterName(res.data.name);
      setContent(res.data.content);
    } else {
      notification.error({ message: '获取失败' });
    }
  };

  useEffect(() => {
    if (id === 'null') {
      return;
    }
    getChapterInfo();
  }, [id]);

  return (
    <div className="info-container">
      <h1>Novels</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '小说管理' }, { title: id === 'null' ? '新建小说章节' : '编辑小说章节' }]}
      />
      <div className="edit-novel-textarea">
        <div className="edit-novel-title">
          <span>章节名称: </span>
          <Input value={chapterName} onChange={e => setChapterName(e.target.value)} />
        </div>
        <TextArea
          style={{
            width: '100%',
            height: '100%'
          }}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Button
          type="primary"
          style={{
            marginTop: '20px'
          }}
          onClick={id === 'null' ? addChapter : updateChapter}
        >
          提交
        </Button>
      </div>
    </div>
  );
};

export { EditNovel };
