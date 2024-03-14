import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const CATEGORY_ENDPOINTS = `${BACKEND_URL}/categories`;

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

function Category({ category }) {
console.log(category);
const { name } = category;
  return (
    <Link to={name}>
      <div className="game-container">
        <h2>{name}</h2>
      </div>
    </Link>
  );
}

Category.propTypes = {
  category: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
};

function categoriesObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const category = keys.map((key) => Data[key]);
  console.log(category);
  return category;
}

function Categories() {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios.get(CATEGORY_ENDPOINTS)
      .then(({ data }) => setCategories(categoriesObjectToArray(data)))
      .catch(() => setError('There was a problem retrieving the list of games.'));
  };

  useEffect(fetchCategories, []);

  return (
    <div className="wrapper">
      <header>
        <h1>
          Search
        </h1>
      </header>
      {error && <ErrorMessage message={error} />}
      {categories.map((category) => <Category key={category.name} restaurant={category} />)}
    </div>
  );
}

export default Categories;