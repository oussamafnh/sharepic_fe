import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import New from './pages/new';
import View from './pages/view';
import Profil from './pages/profil';



export default function Router() {

  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = !!accessToken;


  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Home />:<Login />} />
      <Route path="/register" element={isAuthenticated ? <Home />:<Register />} />
      <Route path='/add_photo' element={isAuthenticated ? <New />:<Home />} />
      <Route path='/profil' element={isAuthenticated ? <Profil />:<Home />} />
      <Route path="/view/:photoId" element={<View />} />
    </Routes>

  </>
}