export interface UploadResType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface DiaryItemType {
  id: string;
  time: string;
  content: string;
  imgs: string;
}
