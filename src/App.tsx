import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Qv2 from './components/MyQv2';

function App() {
  return (
    <div className="App">
     <Dashboard/>
     <hr />
     <h1> Qv2 </h1>
     <Qv2/>
    </div>
  );
}

export default App;
