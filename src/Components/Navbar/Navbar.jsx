import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PAGES = [
  { label: 'HOME', destination: '/Restaurants' },
  { label: 'GROUPS', destination: '/Groups' },
  //{ label: 'SignUp', destination: '/SignUp' },
  //{ label: 'View All Users', destination: '/Users' },
  { label: 'SEARCH', destination: '/Search' },
];

function NavLink({ page }) {
  const { label, destination } = page;
  return (
    <li>
      <Link to={destination}>{label}</Link>
    </li>
  );
}
NavLink.propTypes = {
  page: propTypes.shape({
    label: propTypes.string.isRequired,
    destination: propTypes.string.isRequired,
  }).isRequired,
};

function Navbar() {
  return (
    <nav>
      <ul className="wrapper">
        <img src="/images/Transparent_Logo.png" alt="Logo" className="navbar-logo"/>
        <div className="pages-container">
          {PAGES.map((page) => <NavLink key={page.destination} page={page} />)}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
