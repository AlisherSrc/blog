import './App.css';
import Navbar from './components/navbar';
import { Routes, Route } from "react-router-dom";
import Login from './pages/loginPage';
import Layout from './layout';
import Home from './pages/homePage';
import Register from './pages/registerPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/createPostPage';
import PostPage from './pages/postPage';

function App() {



  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}


export default App;
