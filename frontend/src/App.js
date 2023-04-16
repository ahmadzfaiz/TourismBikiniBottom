import React from 'react';

// Router DOM
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// Components
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Listings from './Components/Listings';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/listings' element={<Listings/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
