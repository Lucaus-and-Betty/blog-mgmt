import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { ArticleInfoType } from './type';

class ArticleService {
  private readonly url = `${SERVER_URL}/articles`;
  private readonly headers = {
    'Content-Type': 'application/json'
  };
  async getAll() {
    try {
      const res = await fetchData<ArticleInfoType[]>('GET', {
        url: this.url + '/all',
        headers: this.headers
      });
      return formatResonse<ArticleInfoType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ArticleInfoType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async delete(id: string) {
    try {
      const res = await fetchData<ArticleInfoType, { id: string }>(
        'POST',
        {
          url: this.url + '/delete',
          headers: this.headers
        },
        {
          id
        }
      );
      return formatResonse<ArticleInfoType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ArticleInfoType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new ArticleService();
