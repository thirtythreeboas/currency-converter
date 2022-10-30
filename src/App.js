import React from 'react';
import Currency from './components/Currency';
import Converter from './components/Converter';
import './css/stylesheet.css';
import { Routes, Route, NavLink } from 'react-router-dom';

function App() {

  const style = ({isActive}) => isActive ? 'route-link active' : 'route-link';

  return (
    <div className="App">
      <nav> 
        <NavLink className={style} to='/' end>Currency Converter</NavLink>
        <NavLink className={style} to='currency'>Relevant Data</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<Converter/>} />
        <Route path='currency' element={<Currency/>} />
      </Routes>
    </div>
  );
}

export default App;
