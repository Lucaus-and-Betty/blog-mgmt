import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { LoveListItemType, AddNewsType } from './type';

class LoveService {
  private readonly url = SERVER_URL + '/love';

  async getAll() {
    try {
      const res = await fetchData<LoveListItemType[]>('GET', {
        url: this.url + '/all',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return formatResonse<LoveListItemType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LoveListItemType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async delete(id: string) {
    try {
      const res = await fetchData<LoveListItemType, { id: string }>(
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
      return formatResonse<LoveListItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LoveListItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async add(project: LoveListItemType) {
    try {
      const res = await fetchData<LoveListItemType, AddNewsType>(
        'POST',
        {
          url: this.url + '/add',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        project
      );
      return formatResonse<LoveListItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LoveListItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async update(project: LoveListItemType) {
    try {
      const res = await fetchData<LoveListItemType, AddNewsType>(
        'POST',
        {
          url: this.url + '/update',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        project
      );
      return formatResonse<LoveListItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LoveListItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new LoveService();
