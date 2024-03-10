import React from 'react';
import propTypes from 'prop-types';
import {
  Routes,
  Route,
} from 'react-router-dom';

import '../../App.css';

import Navbar from '../Navbar';
import Users from '../Users';
import Resaurants from '../Restaurants';
import Login from '../Login';
import Groups from '../Groups';

function Home({ user }) {
  return (
    <>
      <h1>Welcome {user}</h1>
      <Navbar />
      <div className="sign-out-container">
        <button className="sign-out-button">Sign Out</button>
      </div>
      <Routes>
        <Route path="/" element={<Resaurants />} />
        <Route path="restaurants" element={<Resaurants />} />
        <Route path="users" element={<Users />} />
        <Route path="login" element={<Login />} />
        <Route path="groups" element={<Groups />} />
      </Routes>
    </>
  );
}

Home.propTypes = {
  user: propTypes.string.isRequired,
};

export default Home;