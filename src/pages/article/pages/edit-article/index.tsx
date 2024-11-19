import { useEffect, useState, useCallback } from 'react';
import {
  Breadcrumb,
  notification,
  Input,
  Select,
  SelectProps,
  Button,
  Upload,
  type UploadFile,
  type UploadProps,
  Modal
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import editArticleService from './index.service';
import { debounce } from 'lodash';
import { UpdateEditArticleInfoType, AddEditArticleInfoType } from './type';
import localforage from 'localforage';
import { SERVER_URL, IMGS_BASIC_URL } from '@myConstants/index';
import './index.less';

const uploadUrl = SERVER_URL + '/upload';
const access_token = await localforage.getItem<string>('access_token');

const EditArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [readCount, setReadCount] = useState(0);
  const [des, setDes] = useState('');
  const [contentHTML, setContentHTML] = useState('');
  const [labels, setLabels] = useState<SelectProps[]>([]);
  const [selectLabels, setSelectLabels] = useState<string[]>([]);
  const [cover, setCover] = useState<string>('');
  const [uploadList, setUploadList] = useState<UploadFile[]>([]);
  const [showImgsList, setShowImgsList] = useState<boolean>(false);
  const [imgsList, setImgsList] = useState<UploadFile[]>([]);
  const [imgsDoneList, setImgsDoneList] = useState<string[]>([]);

  const getArticleInfo = async () => {
    const res = await editArticleService.getArticleInfo(id || '');
    if (res.success) {
      setTitle(res.data.title);
      setContent(res.data.content);
      setReadCount(res.data.readCount);
      setDes(res.data.des);
      setContentHTML(res.data.contentHTML);
      setCover(res.data.cover);
      const labelsOptions = res.data.labels.map(item => ({ label: item.title, value: item.id }));
      console.log(labelsOptions);
      setSelectLabels(labelsOptions.map(item => item.value));
    } else {
      notification.error({ message: '获取失败' });
    }
  };

  const getAllLabels = async () => {
    const res = await editArticleService.getAllLabels();
    if (res.success) {
      const labelsOptions = res.data.map(item => ({ label: item.title, value: item.id }));
      console.log(labelsOptions);
      setLabels(labelsOptions);
    } else {
      notification.error({ message: '获取失败' });
    }
  };

  // 节流编译 md
  const mdParse = useCallback(
    debounce(async (content: string) => {
      const res = await editArticleService.mdParse(content);
      if (res.success) {
        setContentHTML(res.data.contentHTML);
      } else {
        notification.error({ message: '编辑失败' });
      }
    }, 1000),
    []
  );

  const updateArticle = async () => {
    const updateArticleData: UpdateEditArticleInfoType = {
      id: id || '',
      title,
      readCount,
      content,
      cover,
      des,
      labels: selectLabels
    };
    const res = await editArticleService.updateArticle(updateArticleData);
    if (res.success) {
      navigate('/articles');
      notification.success({ message: '编辑成功' });
    } else {
      notification.error({ message: '编辑失败' });
    }
  };

  const addArticle = async () => {
    const addArticleData: AddEditArticleInfoType = {
      title,
      readCount,
      content,
      cover,
      des,
      labels: selectLabels
    };
    const res = await editArticleService.addArticle(addArticleData);
    if (res.success) {
      notification.success({ message: '新增成功' });
      navigate('/articles');
    } else {
      notification.error({ message: '新增失败' });
    }
  };

  const handleChange: UploadProps['onChange'] = info => {
    console.log(info);
    setUploadList([...info.fileList]);
    if (info.file.status === 'done') {
      setCover(info.file.response.data.filename);
    }
  };

  const handleImgsChange: UploadProps['onChange'] = info => {
    console.log(info);
    setImgsList([...info.fileList]);
    if (info.file.status === 'done') {
      setImgsDoneList([...imgsDoneList, info.file.response.data.filename]);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    const index = uploadList.indexOf(file);
    const newFileList = uploadList.slice();
    newFileList.splice(index, 1);
    setUploadList(newFileList);
    const res = await editArticleService.deleteImg(file.response.data.filename);
    if (res.success) {
      setCover('');
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
    }
  };

  const handleImgsRemove = async (file: UploadFile) => {
    const index = imgsList.indexOf(file);
    const newFileList = imgsList.slice();
    newFileList.splice(index, 1);
    setUploadList(newFileList);
    const res = await editArticleService.deleteImg(file.response.data.filename);
    if (res.success) {
      setImgsDoneList(imgsDoneList.filter(item => item !== file.response.data.filename));
      notification.success({ message: '删除成功' });
    } else {
      notification.error({ message: '删除失败' });
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

  const handleImgsBeforeUpload = (file: UploadFile) => {
    if (!file.size) {
      return Upload.LIST_IGNORE;
    }
    const isFile10M = file.size / 1024 / 1024 < 20;
    if (!isFile10M) {
      notification.error({ message: '文件大小不能超过20M' });
      return Upload.LIST_IGNORE;
    }
  };

  useEffect(() => {
    if (content === '') {
      return;
    }
    mdParse(content);
  }, [content, mdParse]);

  useEffect(() => {
    getAllLabels();
    if (id === 'null') {
      return;
    }
    getArticleInfo();
  }, []);

  const props = {
    headers: {
      Authorization: access_token ? `Bearer ${access_token}` : 'Bearer '
    },
    action: uploadUrl,
    onChange: handleChange,
    onRemove: handleRemove,
    beforeUpload: handleBeforeUpload,
    multiple: false
  };

  const imgsProps = {
    headers: {
      Authorization: access_token ? `Bearer ${access_token}` : 'Bearer '
    },
    action: uploadUrl,
    onChange: handleImgsChange,
    beforeUpload: handleImgsBeforeUpload,
    onRemove: handleImgsRemove,
    multiple: false
  };

  return (
    <div className="info-container">
      <h1>{!id || id === 'null' ? '新增文章' : '编辑文章'}</h1>
      <Breadcrumb
        style={{
          marginBottom: '20px'
        }}
        separator=">"
        items={[{ title: '文章管理' }, { title: id === 'null' ? '新增文章' : '编辑文章' }]}
      />
      <div className="edit-article-cover">
        <span style={{ marginRight: '42px' }}>封面:</span>
        <Upload accept="image/*" {...props} fileList={uploadList}>
          <Button disabled={uploadList.length >= 1}>点击上传</Button>
        </Upload>
        {id === 'null' && cover !== '' && <img src={IMGS_BASIC_URL + '/' + cover} alt="" />}
      </div>
      <div className="edit-article-textarea">
        <div className="edit-article-title edit-article-item">
          <span>标题:</span>
          <Input
            value={title}
            placeholder="请输入标题"
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="edit-article-read-count edit-article-item">
          <span>阅读量:</span>
          <Input
            value={readCount}
            placeholder="请输入阅读量"
            type="number"
            onChange={e => {
              setReadCount(Number(e.target.value));
            }}
          />
        </div>
        <div className="edit-article-des edit-article-item">
          <span>描述:</span>
          <Input
            value={des}
            placeholder="请输入描述"
            onChange={e => {
              setDes(e.target.value);
            }}
          />
        </div>
        <div className="edit-article-labels">
          <span>标签:</span>
          <div className="edit-article-labels-select">
            <Select
              mode="multiple"
              style={{ width: '100%', minWidth: '300px' }}
              placeholder="请选择标签"
              options={labels}
              value={selectLabels}
              onChange={value => {
                setSelectLabels(value);
              }}
            />
          </div>
        </div>
        <div className="edit-article-imgs">
          <span style={{ marginRight: '42px' }}>插图:</span>
          <Upload accept="image/*" {...imgsProps} fileList={imgsList}>
            <Button>点击上传</Button>
          </Upload>
          <Button style={{ marginLeft: '20px' }} onClick={() => setShowImgsList(true)}>
            打开可用插图列表
          </Button>
        </div>
        <div className="edit-article-content edit-article-item">
          <span>内容:</span>
          <div className="edit-article-textarea-content-textarea">
            <div className="edit-article-textarea-content-edit">
              <Input.TextArea
                style={{ height: '100%', resize: 'none' }}
                value={content}
                placeholder="请输入内容"
                onChange={e => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div
              className="edit-article-textarea-content-html"
              dangerouslySetInnerHTML={{
                __html: contentHTML
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="edit-article-submit">
        <Button onClick={id === 'null' ? addArticle : updateArticle} type="primary">
          提交
        </Button>
      </div>
      <Modal open={showImgsList} onCancel={() => setShowImgsList(false)} title="可用插图列表">
        <div className="edit-article-imgs-list">
          {imgsDoneList.map(item => {
            return (
              <div
                className="edit-article-img-item"
                key={item}
                onClick={() => {
                  // 点击复制到剪切板
                  navigator.clipboard.writeText(IMGS_BASIC_URL + '/' + item);
                  notification.success({ message: '复制成功' });
                }}
              >
                <img src={IMGS_BASIC_URL + '/' + item} alt="" />
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export { EditArticle };
