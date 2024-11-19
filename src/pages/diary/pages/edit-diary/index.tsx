import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb, Upload, type UploadProps, Button, type UploadFile, notification, Input } from 'antd';
import { SERVER_URL } from '@myConstants/index';
import localforage from 'localforage';
import editDiaryService from './index.service';
import { useState } from 'react';
import './index.less';

const { TextArea } = Input;
const uploadUrl = SERVER_URL + '/upload';
const access_token = await localforage.getItem<string>('access_token');

const EditDiary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [uploadList, setUploadList] = useState<UploadFile[]>([]);
  const [content, setContent] = useState('');

  const handleChange: UploadProps['onChange'] = info => {
    setUploadList([...info.fileList]);
  };

  const handleRemove = async (file: UploadFile) => {
    const index = uploadList.indexOf(file);
    const newFileList = uploadList.slice();
    newFileList.splice(index, 1);
    setUploadList(newFileList);
    const res = await editDiaryService.delete(file.response.data.filename);
    if (res.success) {
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
    }
  };

  const addData = async () => {
    const res = await editDiaryService.addDiary(
      content,
      uploadList.map(item => item.response.data.filename)
    );
    if (res.success) {
      notification.success({ message: '新增成功' });
      setContent('');
      setUploadList([]);
      navigate('/diaries');
    } else {
      notification.error({ message: '新增失败' });
    }
  };

  const handleBeforeUpload = (file: UploadFile) => {
    if (!file.size) {
      return Upload.LIST_IGNORE;
    }
    const isFile10M = file.size / 1024 / 1024 < 10;
    if (!isFile10M) {
      notification.error({ message: '文件大小不能超过10M' });
      return Upload.LIST_IGNORE;
    }
  };

  const props = {
    headers: {
      Authorization: access_token ? `Bearer ${access_token}` : 'Bearer '
    },
    action: uploadUrl,
    onChange: handleChange,
    onRemove: handleRemove,
    beforeUpload: handleBeforeUpload,
    multiple: true
  };

  return (
    <div className="info-container">
      <h1>Diaries</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '日记管理' }, { title: id === 'null' ? '新增日记' : '编辑日记' }]}
      />
      <Upload {...props} fileList={uploadList}>
        <Button>点击上传</Button>
      </Upload>
      <div className="edit-diary-textarea">
        <TextArea
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ marginTop: '20px', width: '100%', height: '100%' }}
          placeholder="请输入内容"
        ></TextArea>
        <Button
          type="primary"
          style={{
            marginTop: '20px'
          }}
          onClick={addData}
        >
          提交
        </Button>
      </div>
    </div>
  );
};

export { EditDiary };
