import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import UserManagement from './Components/Admin/UserTable.js';
import PackageManagement from './Components/Admin/PackageManagement';
import Reports from './Components/Admin/ManageMessages.js';
import Settings from './Components/Admin/Settings';

export default function Main() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/packages" element={<PackageManagement />} />
        <Route path="/admin/messages" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </>
  );
}
