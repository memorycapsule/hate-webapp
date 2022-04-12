import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import { Navbar } from './components/Nav/Navbar'
import {Tackle} from './components/Tackle/Tackle'

function App() {







  return (
    <div className="App">
      <Navbar />
       
        <Tackle />
        
    </div>
  );
}

export default App;
