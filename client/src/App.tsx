import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUpButton from './components/SignUpButton';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <div className="App">
      <SignUpButton />
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
