import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './pages/loginPage';
import Layout from './layout';
import Home from './pages/homePage';
import Register from './pages/registerPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/createPostPage';
import PostPage from './pages/postPage';
import EditPost from './pages/editPostPage';
import { Helmet } from 'react-helmet';
import ErrorPage from './pages/error';

function App() {



  return (
    <UserContextProvider>
      <Helmet>
        <title>AlisherSK - Blog</title>
        <meta charset="utf-8" />
        <link rel="icon" href="https://alishersk-blog.web.app/favicon_1.ico" />
        <link rel="canonical" href="https://alishersk-blog.web.app/" />
        {/* Social media */}
        <meta property="og:title" content="AlisherSK - Blog" />
        <meta property="og:description" content="AlisherSk - blog about web development" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/alishersk-blog.appspot.com/o/blog_cover.png?alt=media&token=552c6779-d4c3-4a49-a648-9230b80a9bcd" />
        <meta property="og:url" content="https://alishersk-blog.web.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AlisherSK Blog" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Alishror" />
        <meta name="twitter:title" content="AlisherSK - Blog" />
        <meta name="twitter:description" content="AlisherSk - blog about web development" />
        <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/alishersk-blog.appspot.com/o/blog_cover.png?alt=media&token=552c6779-d4c3-4a49-a648-9230b80a9bcd" />
        {/* Robots */}
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff" />
        <meta name="description" content="AlisherSk - blog about web development" />
        <link rel="manifest" href="./manifest.json" />
      </Helmet>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}


export default App;
