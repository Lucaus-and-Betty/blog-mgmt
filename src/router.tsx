import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound, Novel, News, Projects, Love, EditNovel } from '@myPages/index.ts';
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
      </Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
);
