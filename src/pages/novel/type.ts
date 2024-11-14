export interface NovelType {
  id: string;
  name: string;
  publishTime: string;
  updateTime: string;
  author: string;
  count: number;
  des: string;
  cover: string;
}

export interface ChapterListItemType {
  id: string;
  previousId: string;
  time: string;
  name: string;
  order: number;
}
