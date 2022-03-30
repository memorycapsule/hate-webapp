import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Navbar } from './components/Nav/Navbar'
import {Tackle} from './components/Tackle/Tackle'

function App() {

  const [data, setData] = useState('')



  
useEffect(() => {
  axios.post('http://localhost:8000/api', {"data": "one"})
  .then( (result) => {
    // handle success
    setData(result.data)
  })
  .catch( (error) => {
    // handle error
    console.log(error);
  })


}, [])


  return (
    <div className="App">
      <Navbar />
       
        <Tackle />
        
    </div>
  );
}

export default App;
