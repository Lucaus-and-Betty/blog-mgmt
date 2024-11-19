import { SERVER_URL } from '@myConstants/index';
import {
  EditArticleInfoType,
  LabelsType,
  UpdateEditArticleInfoType,
  UploadResType,
  AddEditArticleInfoType
} from './type';
import { fetchData, formatResonse } from '@myUtils/fetchData';

class EditArticleService {
  private readonly url = `${SERVER_URL}/articles`;
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  private readonly url2 = `${SERVER_URL}/label`;
  private readonly headers2 = {
    'Content-Type': 'application/json'
  };

  private readonly uploadUrl = SERVER_URL + '/upload';
  private readonly diaryHeaders = {
    'Content-Type': 'application/json'
  };

  async getArticleInfo(id: string) {
    try {
      const res = await fetchData<EditArticleInfoType, { id: string }>(
        'POST',
        {
          url: this.url + '/get-by-id',
          headers: this.headers
        },
        {
          id
        }
      );
      return formatResonse<EditArticleInfoType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<EditArticleInfoType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async mdParse(content: string) {
    try {
      const res = await fetchData<EditArticleInfoType, { content: string }>(
        'POST',
        {
          url: this.url + '/md-parse',
          headers: this.headers
        },
        {
          content
        }
      );
      return formatResonse<EditArticleInfoType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<EditArticleInfoType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async getAllLabels() {
    try {
      const res = await fetchData<LabelsType[]>('GET', {
        url: this.url2 + '/all',
        headers: this.headers2
      });
      return formatResonse<LabelsType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LabelsType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async updateArticle(data: UpdateEditArticleInfoType) {
    try {
      const res = await fetchData<EditArticleInfoType, UpdateEditArticleInfoType>(
        'POST',
        {
          url: this.url + '/update',
          headers: this.headers
        },
        data
      );
      return formatResonse<EditArticleInfoType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<EditArticleInfoType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  deleteImg = async (fileName: string) => {
    console.log(fileName);
    try {
      const res = await fetchData<UploadResType, { fileName: string }>(
        'POST',
        {
          url: this.uploadUrl + '/delete',
          headers: this.diaryHeaders
        },
        { fileName }
      );
      return formatResonse(res);
    } catch (err) {
      console.log(err);
      return formatResonse<UploadResType>({
        code: 500,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  };

  async addArticle(data: AddEditArticleInfoType) {
    try {
      const res = await fetchData<EditArticleInfoType, AddEditArticleInfoType>(
        'POST',
        {
          url: this.url + '/add-articles',
          headers: this.headers
        },
        data
      );
      return formatResonse<EditArticleInfoType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<EditArticleInfoType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new EditArticleService();
