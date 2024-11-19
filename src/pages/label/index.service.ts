import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { LabelItemType } from './type';

class LabelService {
  private readonly url = SERVER_URL + '/label';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async getAll() {
    try {
      const res = await fetchData<LabelItemType[]>('GET', {
        url: this.url + '/all',
        headers: this.headers
      });
      return formatResonse<LabelItemType[]>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LabelItemType[]>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async delete(id: string) {
    try {
      const res = await fetchData<LabelItemType, { id: string }>(
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
      return formatResonse<LabelItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LabelItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async add(name: string) {
    try {
      const res = await fetchData<LabelItemType, { title: string }>(
        'POST',
        {
          url: this.url + '/add',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        {
          title: name
        }
      );
      return formatResonse<LabelItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LabelItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async update(id: string, title: string) {
    try {
      const res = await fetchData<LabelItemType, { id: string; title: string }>(
        'POST',
        {
          url: this.url + '/update',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        {
          id,
          title
        }
      );
      return formatResonse<LabelItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<LabelItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new LabelService();
