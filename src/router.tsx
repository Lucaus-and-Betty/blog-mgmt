import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  NotFound,
  Novel,
  News,
  Projects,
  Love,
  EditNovel,
  Diary,
  EditDiary,
  Label,
  Article,
  EditArticle
} from '@myPages/index.ts';
import App from './App.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/news" element={<News />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/love" element={<Love />}></Route>
        <Route path="/novels/:id" element={<Novel />}></Route>
        <Route path="/edit-novel/:id" element={<EditNovel />}></Route>
        <Route path="/diaries" element={<Diary />}></Route>
        <Route path="/edit-diary/:id" element={<EditDiary />}></Route>
        <Route path="/labels" element={<Label />}></Route>
        <Route path="/articles" element={<Article />}></Route>
        <Route path="/edit-article/:id" element={<EditArticle />}></Route>
      </Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
);
