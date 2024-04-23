
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import Navbar from '../Navbar';

import { BACKEND_URL } from '../../constants';
const RESTAURANTS_ENDPOINTS = `${BACKEND_URL}/restaurants`;
const GROUP_ENDPOINT = `${BACKEND_URL}/groups`;

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

function removeRestaurant(restaurant) {
  axios.delete(GROUP_ENDPOINT + '/delete/restaurant/' + restaurant + '/' + sessionStorage.getItem("Group"))
      .then((response) => {
          console.log(response.data)
          location.reload();
          })
      .catch((e) => {
          if (e.response && e.response.data && e.response.data.message) {
              console.log(e.response.data.message);
          } else {
              console.log('There was a problem retrieving the list of groups.');
          }
      });
}

function Restaurant({ restaurant }) {
console.log(restaurant);
const { name, Rating, Price, Address, Cuisine } = restaurant;
  return (
      <div className="rest-container">
        <h2>{name}</h2>
        <p>rating: {Rating}</p>
        <p>price: {Price}</p>
        <p>address: {Address}</p>
        <p>cuisine: {Cuisine}</p>
        <div className = "rest-button1">
          <button type="button" onClick={() => removeRestaurant(name)} className="rest-button1"> remove <span></span><span></span><span></span><span></span></button>
        </div>
      </div>
  );
}

Restaurant.propTypes = {
  restaurant: propTypes.shape({
    name: propTypes.string.isRequired,
    Rating: propTypes.number.isRequired,
    Price: propTypes.string.isRequired,
    Address: propTypes.string.isRequired,
    Cuisine: propTypes.string.isRequired,
  }).isRequired,
};

function GroupPage() {

  const group = sessionStorage.getItem('Group');
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState([]);


  const fetchGroupList = () =>{
    console.log("fetching group list")
    axios.get(GROUP_ENDPOINT + "/byname/" + sessionStorage.getItem('Group'))
    .then((response) => {
      console.log(response.data.Restaurants)
      fetchRestaurants(response.data.Restaurants);
    })
    .catch(() => setError("error getting group data"));
  };


  const fetchRestaurants = (groupRest) => {
    axios.get(RESTAURANTS_ENDPOINTS)
      .then(({ data }) =>{
        console.log(data.Data);
        const keys = Object.keys(data.Data).filter(key => groupRest.includes(key));
        const restaurants = keys.map((key) => data.Data[key]);
        setRestaurants(restaurants);
        console.log(restaurants);
      })
      .catch((err) => console.log(err));
  };

  useEffect(fetchGroupList, []);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <header>
          <h1>
          {group} Restaurants:
          </h1>
        </header>
        {error && <ErrorMessage message={error} />}
        {restaurants.map((restaurant) => <Restaurant key={restaurant.name} restaurant={restaurant} />)}
      </div>
    </div>

  );
}

export default GroupPage;