import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';
import Navbar from '../Navbar';


const RESTAURANTS_ENDPOINTS = `${BACKEND_URL}/restaurants`;
const GROUPS_ENDPOINT = `${BACKEND_URL}/groups`;

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



function SendGroupForm({
  visible,
  cancel,
  setError,
  restaurant_name,
}) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setGroup] = useState('');

  const changeGroup = (event) => {setGroup(event.target.value); };

  const fetchGroups = () => {
    axios.get(GROUPS_ENDPOINT)
        .then((response) => {
            const groupsObject = response.data.Data;
            const filteredGroups = Object.values(groupsObject).filter(group => group.Members.includes(sessionStorage.getItem("user")));
            const groupsArray = Object.values(filteredGroups).map(group => ({
                name: group.group_name,
            }));
            setGroups(groupsArray);
        })
        .catch((e) => {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                setError('There was a problem retrieving the list of groups.');
            }
        });
  };

  useEffect(
      fetchGroups,
      [],
  );

  const addToGroup = () => {
    axios.post(GROUPS_ENDPOINT + '/add_restaurant', { group_name: selectedGroup, Restaurants: restaurant_name})
        .then((response) => {
            console.log(response);
        })
        .catch((e) => {
          console.log(e);
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                setError('There was a problem retrieving the list of groups.');
            }
        });
    };

  if (!visible) return null;
  return (
    <div className="like-container">
      <p> Which group would you like to add it to?</p>
      {groups.map((group) => (
        <div key={group.name} className="like-container2">
          <label className="new-wrapper">
            <input
              type="radio"
              name={restaurant_name}
              value={group.name}
              onChange={changeGroup}
              checked={selectedGroup === group.name}
            />
            {group.name}
          </label>
        </div>
      ))}
    <div className="like-container3">
      <button type="submit" className="grps-button3" onClick={cancel}>Cancel <span></span><span></span><span></span><span></span></button>
      <span className="button-spacing"></span>
      <button type="submit" className="grps-button4" onClick={addToGroup}>Submit <span></span><span></span><span></span><span></span></button>
    </div>
  </div>
  );
}

SendGroupForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
  restaurant_name: propTypes.string.isRequired,
};


function Restaurant({ restaurant }) {
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const hideForm = () => { setShowForm(false); };
  const showGroupFrom = () => { setShowForm(true); };
  const { name, Rating, Price, Address, Cuisine } = restaurant;
  return (
    <div>
      <div className="rest-container">
        <h2>{name}</h2>
        <p>rating: {Rating}</p>
        <p>price: {Price}</p>
        <p>address: {Address}</p>
        <p>cuisine: {Cuisine}</p>
        <div className = "rest-button">
          <button onClick={showGroupFrom} type="button" className="rest-button"> Like ♡ <span></span><span></span><span></span><span></span></button>
        </div>
      </div>
      <div>
      <SendGroupForm
        visible={showForm}
        cancel={hideForm}
        setError={setError}
        restaurant_name={name}
      />
      {error && <ErrorMessage message={error} />}
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

function restaurantsObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const restaurants = keys.map((key) => Data[key]);
  return restaurants;
}

function Restaurants() {
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = () => {
    axios.get(RESTAURANTS_ENDPOINTS)
      .then(({ data }) => setRestaurants(restaurantsObjectToArray(data)))
      .catch(() => setError('There was a problem retrieving the list of resturants.'));
  };


  useEffect(fetchRestaurants, []);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <header>
          <h1>
            View All Restaurants
          </h1>
        </header>
        {error && <ErrorMessage message={error} />}
        {restaurants.map((restaurant) => <Restaurant key={restaurant.name} restaurant={restaurant} />)}
      </div>
    </div>

  );
}

export default Restaurants;