import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeFeed from './components/HomeFeed';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
};

export default App;