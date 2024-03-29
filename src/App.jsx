import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import AdminHome from './components/AdminHome';
import 'antd/dist/reset.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <AdminHome /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
