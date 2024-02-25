import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const RESTAURANTS_ENDPOINTS = `${BACKEND_URL}/restaurants`;

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

function Restaurant({ restaurant }) {
const { name, rating, price, address, cuisine } = restaurant;
  return (
    <Link to={name}>
      <div className="game-container">
        <h2>{name}</h2>
        <p>rating: {rating}</p>
        <p>price: {price}</p>
        <p>address: {address}</p>
        <p>cuisine: {cuisine}</p>
      </div>
    </Link>
  );
}

Restaurant.propTypes = {
  restaurant: propTypes.shape({
    name: propTypes.string.isRequired,
    rating: propTypes.number.isRequired,
    price: propTypes.string.isRequired,
    address: propTypes.string.isRequired,
    cuisine: propTypes.string.isRequired,
  }).isRequired,
};

function restaurantsObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const games = keys.map((key) => Data[key]);
  return games;
}

function Restaurants() {
  console.log("restaurants");
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  // const [addingGame, setAddingGame] = useState(false);

  const fetchGames = () => {
    axios.get(RESTAURANTS_ENDPOINTS)
      .then(({ data }) => setRestaurants(restaurantsObjectToArray(data)))
      .catch(() => setError('There was a problem retrieving the list of games.'));
  };

  // const showAddGameForm = () => { setAddingGame(true); };
  // const hideAddGameForm = () => { setAddingGame(false); };

  useEffect(fetchGames, []);

  return (
    <div className="wrapper">
      <header>
        <h1>
          View All Restaurants
        </h1>
        {/* <button type="button" onClick={showAddGameForm}>
          Add a Game
        </button> */}
      </header>
      {/* <AddGameForm
        visible={addingGame}
        cancel={hideAddGameForm}
        fetchGames={fetchGames}
        setError={setError}
      /> */}
      {error && <ErrorMessage message={error} />}
      {restaurants.map((restaurant) => <Restaurant key={restaurant.name} restaurant={restaurant} />)}
    </div>
  );
}

export default Restaurants;