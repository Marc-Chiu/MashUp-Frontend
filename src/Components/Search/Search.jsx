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
    return (
        <Link to={`/restaurants/${category.category}`}>
            <div className="category-container">
                <h2>{category.category}</h2>
            </div>
        </Link>
    );
}

Category.propTypes = {
  category: propTypes.shape({
    name: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
  }).isRequired,
};

function categoriesObjectToArray({ Data }) {
  const keys = Object.keys(Data);
  const category = keys.map((key) => Data[key]);
  return category;
}

function Search() {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCategories = () => {
    axios.get(CATEGORY_ENDPOINTS)  
      .then((response) => {
        const categoriesArray = categoriesObjectToArray(response.data);
        setCategories(categoriesArray);
        setFilteredCategories(categoriesArray); 
      })
      .catch(() => setError('There was a problem retrieving the list of categories.'));
  };
  
  useEffect(fetchCategories, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = categories.filter(category =>
        category?.category?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <header>
          <h1>Search</h1>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </header>
        {error && <ErrorMessage message={error} />}
        {filteredCategories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Search;