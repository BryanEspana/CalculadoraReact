import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './pages/Calculator';

function App() {
  return (
    <div style={appPage} className="App">

      <Calculator />
    </div>
  );
}

export default App;

const appPage = {
  backgroundColor: '#25384E',
  color: 'white',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',

}