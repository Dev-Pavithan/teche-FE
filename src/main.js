import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Components/LandingPage/Home';
import Nav from './Components/Navbar/Nav';
import Footer from './Components/Footer/footer';
import Features from './Components/Features/features';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Contact from './Components/Contact/contact';

import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminHome from './Components/Admin/Home.js'
import UserManagement from './Components/Admin/UserTable.js';
import PackageManagement from './Components/Admin/PackageManagement';
import Message from './Components/Admin/ManageMessages.js';
import Settings from './Components/Admin/Settings';

export default function Main() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="packages" element={<PackageManagement />} />
          <Route path="messages" element={<Message />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}
