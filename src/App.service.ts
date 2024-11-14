import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';

interface NovelType {
  id: string;
  name: string;
  publishTime: string;
  updateTime: string;
  author: string;
  count: number;
  des: string;
  cover: string;
}

class AppService {
  private readonly url = `${SERVER_URL}/users`;
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  private readonly novelUrl = `${SERVER_URL}/novel`;
  private readonly novelHeaders = {
    'Content-Type': 'application/json'
  };

  async testLoginState() {
    try {
      const res = await fetchData<{
        user: {
          email: string;
        };
      }>('GET', {
        url: this.url + '/test',
        headers: this.headers
      });
      return formatResonse<{ user: { email: string } }>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<{ user: { email: string } }>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async getAllNovels() {
    try {
      const res = await fetchData<NovelType[]>('GET', {
        url: this.novelUrl + '/all',
        headers: this.novelHeaders
      });
      return formatResonse<NovelType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<NovelType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new AppService();
