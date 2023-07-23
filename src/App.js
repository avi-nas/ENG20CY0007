import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import GetUrlData from './geturls/GetUrlData';
function App() {
  return (
    <div className="App">
      <GetUrlData/>
    </div>
  );
}

export default App;
