import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Profile';
import UserPost from './components/UserPost';
import CommentPage from './components/Comments';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/post' element={<UserPost />} />
      <Route path='/post/:id' element={<CommentPage />} />
      <Route path='*' element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
