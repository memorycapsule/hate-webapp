import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data} 
          Hasan
        </p>
        
      </header>
    </div>
  );
}

export default App;
