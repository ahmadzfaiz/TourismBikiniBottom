import React from 'react';

// Router DOM
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// Components
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Listings from './Components/Listings';
import Testing from './Components/Testing';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
