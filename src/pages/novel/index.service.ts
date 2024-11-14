import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { NovelType, ChapterListItemType } from './type';

class NovelService {
  private readonly url = SERVER_URL + '/novel';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async getNovelInfo(id: string) {
    try {
      const res = await fetchData<NovelType, { id: string }>(
        'POST',
        {
          url: this.url + '/info',
          headers: this.headers
        },
        {
          id
        }
      );
      return formatResonse<NovelType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<NovelType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async getAllChapters(id: string) {
    try {
      const res = await fetchData<ChapterListItemType[], { id: string }>(
        'POST',
        {
          url: this.url + '/all-chapter-info',
          headers: this.headers
        },
        {
          id
        }
      );
      return formatResonse<ChapterListItemType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ChapterListItemType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new NovelService();
