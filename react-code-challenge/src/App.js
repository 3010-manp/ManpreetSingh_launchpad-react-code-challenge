
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostalLookup from './Components/Pages/PostalLookup';
import Universities from './Components/Pages/Universities';
import Navbar from './Components/Navbar';
import Home from './Components/Pages/Home';

function App() {
 
  return (
    <div>
    <Navbar />
      <Routes>
        <Route exact={true} path="/" element={<Home/>} />
        <Route exact={true} path="/universities" element={<Universities/>} /> 
        <Route exact={true} path="/postalLookup" element={<PostalLookup/>} /> 
      </Routes>
      
    </div>
  );
}

export default App
