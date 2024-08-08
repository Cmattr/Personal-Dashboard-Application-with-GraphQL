import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Profile';
import UserPost from './components/UserPost';
import ToDos from './components/Todos';
import CommentPage from './components/Comments';

function App() {
  const exampleTodoId = "1"; // Replace with a dynamic value or route parameter as needed

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/post' element={<UserPost />} />
      <Route path='/post/:id' element={<CommentPage />} />
      <Route path='/todo' element={<ToDos todoId={'13'} />} /> 
      <Route path='*' element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
