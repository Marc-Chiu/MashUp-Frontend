
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

function Restaurant({ restaurant }) {
console.log(restaurant);
const { name, Rating, Price, Address, Cuisine } = restaurant;
  return (
      <div className="game-container">
        <h2>{name}</h2>
        <p>rating: {Rating}</p>
        <p>price: {Price}</p>
        <p>address: {Address}</p>
        <p>cuisine: {Cuisine}</p>
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

// import React, { useEffect, useState } from 'react';
// import propTypes from 'prop-types';
// import axios from 'axios';

// import { BACKEND_URL } from '../../constants';
// import Navbar from '../Navbar';


// function restaurantsObjectToArray({ Data }) {
//   const keys = Object.keys(Data);
//   const restaurants = keys.map((key) => Data[key]);
//   console.log(restaurants);
//   return restaurants;
// }

// function GroupHome() {
//   const [error, setError] = useState('');
//   const [restaurants, setRestaurants] = useState([]);
//   const [groupRestaurants, setGroup] = useState([]);

//   fetchGroups = () => {
//     axios.get(GROUPS_ENDPOINT+ "/byname/" + sessionStorage.getItem('Group'))
//             .then((response) => {
//                 const groupsObject = response.data.Data;
//                 const filteredGroups = Object.values(groupsObject).filter(group => group.name == sessionStorage.getItem('Group'));
//                 const groupsArray = Object.values(filteredGroups).map(group => ({
//                     name: group.group_name,
//                     Members: group.Members, // Flatten the array of Members
//                     Restaurants: group.Restaurants,
//                 }));
//                 setGroup(groupsArray);
//                 console.log(groupsArray);
//             })
//             .catch((e) => {
//                 if (e.response && e.response.data && e.response.data.message) {
//                     setError(e.response.data.message);
//                 } else {
//                     setError('There was a problem retrieving the list of groups.');
//                 }
//             });
//   }

//   const fetchRestaurants = () => {
//     const group = sessionStorage.getItem('Group');
//     const restaurant =
//     axios.get(RESTAURANTS_ENDPOINTS)
//       .then(({ data }) => setRestaurants(restaurantsObjectToArray(data)))
//       .catch(() => setError('There was a problem retrieving the list of games.'));
//   };


//   useEffect(fetchRestaurants, fetchGroups, []);

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