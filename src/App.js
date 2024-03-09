import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your authentication logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="App">

      <img src="side-logo.png" alt="logo" className="side-logo" />
      <h1 className="Servicita">Servicita</h1>

      <div className="login-container">
      <h1 className="Admin">Admin</h1>
      <h1 className="Login">Login</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={handleLogin}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
