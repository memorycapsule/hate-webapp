import './App.css';
import { Navbar } from './components/Nav/Navbar'
import {Tackle} from './components/Tackle/Tackle'
import {How} from './components/How/How'
import { Dashboard } from './components/Dashboard/Dashboard';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>        
          <Route exact path="/" element={<Tackle />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/How" element={<How />} />
        </Routes>

    </div>
  );
}

export default App;
