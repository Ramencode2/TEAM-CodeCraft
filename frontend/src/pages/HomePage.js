// frontend/src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Team CodeCraft</h1>
      <p className="home-subtitle">
        Manage your team members efficiently with our team management application.
        Add new members, view their profiles, and keep track of everyone in the team.
      </p>
      <div className="home-buttons">
        <Link to="/add-member" className="btn btn-primary home-button">
          Add Member
        </Link>
        <Link to="/view-members" className="btn btn-secondary home-button">
          View Members
        </Link>
      </div>
    </div>
  );
};

export default HomePage;