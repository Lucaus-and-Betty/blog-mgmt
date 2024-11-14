import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { AddChapterItemType, ChapterListItemType } from './type';

class EditNovelService {
  private readonly url = SERVER_URL + '/novel';
  private readonly headers = {
    'Content-Type': 'application/json'
  };

  async addChapter(chapter: AddChapterItemType) {
    try {
      const res = await fetchData<ChapterListItemType, AddChapterItemType>(
        'POST',
        {
          url: this.url + '/add-chapter',
          headers: this.headers
        },
        chapter
      );
      return formatResonse(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async updateChapter(id: string, content: string) {
    try {
      const res = await fetchData<ChapterListItemType, { id: string; content: string }>(
        'POST',
        {
          url: this.url + '/update-chapter',
          headers: this.headers
        },
        {
          id,
          content
        }
      );
      return formatResonse<ChapterListItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ChapterListItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }

  async getChapterInfo(id: string) {
    try {
      const res = await fetchData<ChapterListItemType, { id: string }>(
        'POST',
        {
          url: this.url + '/get-chapter-info',
          headers: this.headers
        },
        {
          id
        }
      );
      return formatResonse<ChapterListItemType>(res);
    } catch (error) {
      // TODO: '处理错误';
      console.log(error);
      return formatResonse<ChapterListItemType>({ code: 500, message: 'error', data: { error_type: 0 } });
    }
  }
}

export default new EditNovelService();
