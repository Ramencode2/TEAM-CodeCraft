// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <h1>
          <Link to="/" className="logo">Team CodeCraft</Link>
        </h1>
        <SearchBar />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-member">Add Member</Link>
            </li>
            <li>
              <Link to="/view-members">View Members</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;