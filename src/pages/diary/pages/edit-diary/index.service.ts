import { SERVER_URL } from '@myConstants/index';
import { fetchData, formatResonse } from '@myUtils/fetchData';
import { UploadResType, DiaryItemType } from './type';

class EditDiaryService {
  private readonly uploadUrl = SERVER_URL + '/upload';

  private readonly diaryUrl = SERVER_URL + '/diary';
  private readonly diaryHeaders = {
    'Content-Type': 'application/json'
  };

  private readonly deleteHeaders = {
    'Content-Type': 'application/json'
  };

  delete = async (fileName: string) => {
    console.log(fileName);
    try {
      const res = await fetchData<UploadResType, { fileName: string }>(
        'POST',
        {
          url: this.uploadUrl + '/delete',
          headers: this.deleteHeaders
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

  async addDiary(content: string, imgs: string[]) {
    try {
      const res = await fetchData<DiaryItemType, { content: string; imgs: string }>(
        'POST',
        {
          url: this.diaryUrl + '/add',
          headers: this.diaryHeaders
        },
        { content, imgs: JSON.stringify(imgs) }
      );
      return formatResonse(res);
    } catch (err) {
      console.log(err);
      return formatResonse<DiaryItemType>({
        code: 500,
        message: 'error',
        data: { error_type: 0 }
      });
    }
  }
}

export default new EditDiaryService();
