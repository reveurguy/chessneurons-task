import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Favourites from './pages/favourites';

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:id"  element={<Dashboard />} />
        <Route path="/dashboard/:id/favourites"  element={<Favourites />} />
      </Routes>
    </>
  );
}
