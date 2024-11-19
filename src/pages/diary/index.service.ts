import { SERVER_URL } from '../../constants';
import { fetchData, formatResonse } from '../../utils/fetchData';
import { DiaryItemType } from './type';

class DiaryService {
  private readonly url = SERVER_URL + '/diary';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async getAll() {
    try {
      const res = await fetchData<DiaryItemType[]>('GET', {
        url: this.url + '/all',
        headers: this.headers
      });
      return formatResonse<DiaryItemType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<DiaryItemType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async delete(id: string) {
    try {
      const res = await fetchData<DiaryItemType, { id: string }>(
        'POST',
        {
          url: this.url + '/delete',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        {
          id
        }
      );
      return formatResonse<DiaryItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<DiaryItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new DiaryService();
