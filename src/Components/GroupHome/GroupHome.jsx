
import React from 'react';

function GroupPage() {
  const group = sessionStorage.getItem('Group');

  return (
    <div>
      <h1>Group: {group}</h1>
    </div>
  );
}

export default GroupPage;

// import React, { useEffect, useState } from 'react';
// import propTypes from 'prop-types';
// import axios from 'axios';

// import { BACKEND_URL } from '../../constants';
// import Navbar from '../Navbar';

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
//       <div className="game-container">
//         <h2>{name}</h2>
//         <p>rating: {Rating}</p>
//         <p>price: {Price}</p>
//         <p>address: {Address}</p>
//         <p>cuisine: {Cuisine}</p>
//         <button>Add</button>
//       </div>
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

// function GroupHome() {
//   //console.log("restaurants");
//   const [error, setError] = useState('');
//   const [restaurants, setRestaurants] = useState([]);

//   const fetchRestaurants = () => {
//     axios.get(RESTAURANTS_ENDPOINTS)
//       .then(({ data }) => setRestaurants(restaurantsObjectToArray(data)))
//       .catch(() => setError('There was a problem retrieving the list of games.'));
//   };


//   useEffect(fetchRestaurants, []);

//   return (
//     <div>
//       <Navbar />
//       <div className="wrapper">

//         <header>
//           <h1>
//             View All Restaurants
//           </h1>
//         </header>
//         {error && <ErrorMessage message={error} />}
//         {restaurants.map((restaurant) => <Restaurant key={restaurant.name} restaurant={restaurant} />)}
//       </div>
//     </div>

//   );
// }

// export default GroupHome;