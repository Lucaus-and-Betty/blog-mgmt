import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { NewsType, AddNewsType } from './type';

class NewsService {
  private url = SERVER_URL + '/news';
  private headers = {
    'Content-Type': 'application/json'
  };
  async getAllNews() {
    try {
      const res = await fetchData<NewsType[]>('GET', {
        url: this.url + '/all',
        headers: this.headers
      });
      return formatResonse<NewsType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<NewsType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async updateNews(news: NewsType) {
    try {
      const res = await fetchData<NewsType, NewsType>(
        'POST',
        {
          url: this.url + '/update',
          headers: this.headers
        },
        news
      );
      return formatResonse<NewsType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<NewsType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async deleteNews(id: string) {
    try {
      const res = await fetchData<NewsType, { id: string }>(
        'POST',
        {
          url: this.url + '/delete',
          headers: this.headers
        },
        {
          id
        }
      );
      return formatResonse<NewsType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<NewsType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async addNews(news: AddNewsType) {
    try {
      const res = await fetchData<NewsType, AddNewsType>(
        'POST',
        {
          url: this.url + '/add',
          headers: this.headers
        },
        news
      );
      return formatResonse<NewsType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<NewsType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new NewsService();
