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

function App() {



  return (
    <UserContextProvider>
      <Helmet>
        <title>AlisherSK - Blog</title>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon_1.ico" />
        <link rel="canonical" href="https://alishersk-blog.web.app/" />
        {/* Social media */}
        <meta property="og:title" content="AlisherSK - Blog" />
        <meta property="og:description" content="AlisherSk - blog about web development" />
        <meta property="og:image" content="%PUBLIC_URL%/social-share-image.jpg" />
        <meta property="og:url" content="https://alishersk-blog.web.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AlisherSK Blog" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Alishror" />
        <meta name="twitter:title" content="AlisherSK - Blog" />
        <meta name="twitter:description" content="AlisherSk - blog about web development" />
        <meta name="twitter:image" content="%PUBLIC_URL%/twitter-card-image.jpg" />
        {/* Robots */}
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#181a1b" />
        <meta name="description" content="AlisherSk - blog about web development" />
      </Helmet>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}


export default App;
