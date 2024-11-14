export interface AddChapterItemType {
  name: string;
  novelId: string;
  content: string;
}

export interface ChapterListItemType {
  id: string;
  previousId: string;
  time: string;
  name: string;
  order: number;
  content: string;
}
