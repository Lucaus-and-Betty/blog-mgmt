export interface ArticleInfoType {
  id: string;
  title: string;
  publishTime: string;
  updateTime: string;
  readCount: number;
  content: string;
  cover: string;
  labels: LabelsType[];
  des: string;
}

export interface LabelsType {
  id: string;
  title: string;
  createTime: string;
}
