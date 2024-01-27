import './App.css';
import Navbar from './components/navbar';
import Post from './components/post/post';
import { Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Layout from './layout';
import Home from './pages/home';
import Register from './pages/register';

function App() {



  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </Routes>
  );
}


export default App;
