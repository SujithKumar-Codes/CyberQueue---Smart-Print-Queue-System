import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register';
import './styles/auth.css';
import { FormUpload } from './components/FormUpload';
import { UserJobs } from './components/UserJobs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<FormUpload />} />
        <Route path="/jobs" element={<UserJobs />} />
      </Routes>
    </Router>
  );
}

export default App;