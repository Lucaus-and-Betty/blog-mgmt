export interface EditArticleInfoType {
  id: string;
  title: string;
  readCount: number;
  content: string;
  cover: string;
  des: string;
  labels: LabelsType[];
  contentHTML: string;
}

export interface UpdateEditArticleInfoType {
  id: string;
  title: string;
  readCount: number;
  content: string;
  cover: string;
  des: string;
  labels: string[];
}

export interface AddEditArticleInfoType {
  title: string;
  readCount: number;
  content: string;
  cover: string;
  des: string;
  labels: string[];
}

export interface LabelsType {
  id: string;
  title: string;
  createTime: string;
}

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
