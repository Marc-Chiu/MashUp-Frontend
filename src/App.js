import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Users from './Components/Users';
import Resaurants from './Components/Restaurants';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="restaurants" element={<Resaurants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
