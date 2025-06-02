import React, { useState } from 'react';
import Login from './components/login';
import Calculator from './components/calculator';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div style={styles.container}>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Calculator token={token} onLogout={handleLogout} />
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  }
};

export default App;
