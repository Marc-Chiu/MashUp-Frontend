import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

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
      <div className="cat-container">
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

function Search() {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCategories = () => {
    axios.get(CATEGORY_ENDPOINTS)
      .then(({ data }) => setCategories(categoriesObjectToArray(data)))
      .catch(() => setError('There was a problem retrieving the list of categories.'));
  };

  useEffect(fetchCategories, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <header>
          <h1>
            Search
          </h1>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </header>
        {error && <ErrorMessage message={error} />}
        {filteredCategories.map((category) => <Category key={category.name} category={category} />)}
      </div>
    </div>

  );
}

export default Search;