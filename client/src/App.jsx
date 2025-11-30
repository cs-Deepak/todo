import { useState } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './Component/Home';
import Header from './Component/Headers';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Dashboard from './Component/Dashboard';
import Error from './Component/Error';
import Document from './Component/Document';
import Chartbar from './Component/footer/Chartbar';
import Linechart from './Component/footer/Linechart';
import Setting from './Component/footer/Setting';
import Zip from './Component/footer/Zip';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Hide header on login/signup/dashboard */}
      {location.pathname !== '/auth/login' && location.pathname !== '/auth/signup' && location.pathname !== '/dashboard' && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/document" element={<Document />} />
        <Route path="/chartbar" element={<Chartbar />} />
        <Route path="/linechart" element={<Linechart />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/zip" element={<Zip />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
