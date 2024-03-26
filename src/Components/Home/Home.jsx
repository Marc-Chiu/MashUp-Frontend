// Unused page at the moment

import React from 'react';
import propTypes from 'prop-types';
// import {
//   Routes,
//   Route,
// } from 'react-router-dom';

import '../../App.css';

import Navbar from '../Navbar';
// import Users from '../Users';
// import Resaurants from '../Restaurants';
// import Login from '../Login';
// import SignUp from '../SignUp';
// import Groups from '../Groups';

function Home({ user }) {
  return (
    <div>
      <Navbar />
      <h1>Welcome {user}</h1>
    </div>
    // <>
    //   <h1>Welcome {user}</h1>
    //   <Navbar />
    //   <div className="sign-out-container">
    //     <button className="sign-out-button">Sign Out</button>
    //   </div>
    //   <Routes>
    //     <Route path="/" element={<Resaurants />} />
    //     <Route path="restaurants" element={<Resaurants />} />
    //     <Route path="users" element={<Users />} />
    //     <Route path="login" element={<Login />} />
    //     <Route path="signup" element={<SignUp />} />
    //     <Route path="groups" element={<Groups />} />
    //   </Routes>
    // </>
  );
}

Home.propTypes = {
  user: propTypes.string.isRequired,
};

export default Home;