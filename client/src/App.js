import './App.css';
import Navbar from './components/navbar';
import Post from './components/post/post';
import { Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Layout from './layout';
import Home from './pages/home';
import Register from './pages/register';
import { UserContextProvider } from './UserContext';

function App() {



  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}


export default App;
