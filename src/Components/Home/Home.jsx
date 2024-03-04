// import React, { useEffect, useState } from 'react';
// import propTypes from 'prop-types';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// import { BACKEND_URL } from '../../constants';

// const RESTAURANTS_ENDPOINTS = `${BACKEND_URL}/restaurants`;

// function ErrorMessage({ message }) {
//   return (
//     <div className="error-message">
//       {message}
//     </div>
//   );
// }
// ErrorMessage.propTypes = {
//   message: propTypes.string.isRequired,
// };

// function Restaurant({ restaurant }) {
// console.log(restaurant);
// const { name, Rating, Price, Address, Cuisine } = restaurant;
//   return (
//     <Link to={name}>
//       <div className="game-container">
//         <h2>{name}</h2>
//         <p>rating: {Rating}</p>
//         <p>price: {Price}</p>
//         <p>address: {Address}</p>
//         <p>cuisine: {Cuisine}</p>
//       </div>
//     </Link>
//   );
// }

// Restaurant.propTypes = {
//   restaurant: propTypes.shape({
//     name: propTypes.string.isRequired,
//     Rating: propTypes.number.isRequired,
//     Price: propTypes.string.isRequired,
//     Address: propTypes.string.isRequired,
//     Cuisine: propTypes.string.isRequired,
//   }).isRequired,
// };

// function restaurantsObjectToArray({ Data }) {
//   const keys = Object.keys(Data);
//   const restaurants = keys.map((key) => Data[key]);
//   console.log(restaurants);
//   return restaurants;
// }

// function Home({ user }) {
//   //console.log("restaurants");
//   const [error, setError] = useState('');
//   const [restaurants, setRestaurants] = useState([]);
//   // const [addingGame, setAddingGame] = useState(false);

//   const fetchRestaurants = () => {
//     axios.get(RESTAURANTS_ENDPOINTS)
//       .then(({ data }) => setRestaurants(restaurantsObjectToArray(data)))
//       .catch(() => setError('There was a problem retrieving the list of games.'));
//   };

//   // const showAddGameForm = () => { setAddingGame(true); };
//   // const hideAddGameForm = () => { setAddingGame(false); };

//   useEffect(fetchRestaurants, []);

//   return (
//     <div className="wrapper">
//       <header>
//         <h1>
//           {user} View All Restaurants
//         </h1>
//         {/* <button type="button" onClick={showAddGameForm}>
//           Add a Game
//         </button> */}
//       </header>
//       {/* {error && <ErrorMessage message={error} />}
//       {restaurants.map((restaurant) => <Restaurant key={restaurant.name} restaurant={restaurant} />)} */}
//     </div>
//   );
// }

// export default Home;

import React from 'react';
//import { CookiesProvider, useCookies } from 'react-cookie'
import {
  BrowserRouter,
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
    <BrowserRouter>
      <h1>Welcome {user}</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Resaurants />} />
        <Route path="restaurants" element={<Resaurants />} />
        <Route path="users" element={<Users />} />
        <Route path="login" element={<Login />} />
        <Route path="groups" element={<Groups />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Home;