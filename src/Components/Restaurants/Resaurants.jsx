import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const Restaurants_ENDPOINT = `${BACKEND_URL}/Restaurants`;


function Restaurants() {
  useEffect(() => {
    axios.get(Restaurants_ENDPOINT)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving Restaurants:', error);
      });
  }, []);

  return null;
}

export default Restaurants;


// function AddRestaurantForm({
//   visible,
//   cancel,
//   fetchRestaurants,
//   setError,
// }) {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState(0);

//   const changeName = (event) => { setName(event.target.value); };
//   const changeNumber = (event) => { setNumber(event.target.value); };

//   const addRestaurant = (event) => {
//     event.preventDefault();
//     axios.post(RestaurantS_ENDPOINT, { name, numPlayers: number })
//       .then(fetchRestaurants)
//       .catch(() => { setError('There was a problem adding the Restaurant.'); });
//   };

//   if (!visible) return null;
//   return (
//     <form>
//       <label htmlFor="name">
//         Name
//       </label>
//       <input required type="text" id="name" value={name} onChange={changeName} />
//       <label htmlFor="number-of-players">
//         Number of players
//       </label>
//       <input required type="number" id="number-of-players" onChange={changeNumber} />
//       <button type="button" onClick={cancel}>Cancel</button>
//       <button type="submit" onClick={addRestaurant}>Submit</button>
//     </form>
//   );
// }
// AddRestaurantForm.propTypes = {
//   visible: propTypes.bool.isRequired,
//   cancel: propTypes.func.isRequired,
//   fetchRestaurants: propTypes.func.isRequired,
//   setError: propTypes.func.isRequired,
// };

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

// function Restaurant({ Restaurant }) {
//   const { name, numPlayers } = Restaurant;
//   return (
//     <div className="Restaurant-container">
//       <h2>{name}</h2>
//       <p>
//         Players: {numPlayers}
//       </p>
//     </div>
//   );
// }
// Restaurant.propTypes = {
//   Restaurant: propTypes.shape({
//     name: propTypes.string.isRequired,
//     numPlayers: propTypes.number.isRequired,
//   }).isRequired,
// };

// function RestaurantsObjectToArray({ Data }) {
//   const keys = Object.keys(Data);
//   const Restaurants = keys.map((key) => Data[key]);
//   return Restaurants;
// }

// function Restaurants() {
//   const [error, setError] = useState('');
//   const [Restaurants, setRestaurants] = useState([]);
//   const [addingRestaurant, setAddingRestaurant] = useState(false);

//   const fetchRestaurants = () => {
//     axios.get(RestaurantS_ENDPOINT)
//       .then(({ data }) => setRestaurants(RestaurantsObjectToArray(data)))
//       .catch(() => setError('There was a problem retrieving the list of Restaurants.'));
//   };

//   const showAddRestaurantForm = () => { setAddingRestaurant(true); };
//   const hideAddRestaurantForm = () => { setAddingRestaurant(false); };

//   useEffect(fetchRestaurants, []);

//   return (
//     <div className="wrapper">
//       <header>
//         <h1>
//           View All Restaurants
//         </h1>
//         <button type="button" onClick={showAddRestaurantForm}>
//           Add a Restaurant
//         </button>
//       </header>
//       <AddRestaurantForm
//         visible={addingRestaurant}
//         cancel={hideAddRestaurantForm}
//         fetchRestaurants={fetchRestaurants}
//         setError={setError}
//       />
//       {error && <ErrorMessage message={error} />}
//       {Restaurants.map((Restaurant) => <Restaurant key={Restaurant.name} Restaurant={Restaurant} />)}
//     </div>
//   );
// }

// export default Restaurants;
