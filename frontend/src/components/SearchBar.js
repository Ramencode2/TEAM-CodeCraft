import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get('search') || '';

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (location.pathname === '/view-members') {
      // Update URL with search parameter
      const params = new URLSearchParams(location.search);
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      navigate(`${location.pathname}?${params.toString()}`);
    } else {
      // If not on view-members page, navigate there with search
      navigate(`/view-members?search=${searchTerm}`);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search team members..."
        value={currentSearch}
        onChange={handleSearch}
      />
      <i className="search-icon">🔍</i>
    </div>
  );
};

export default SearchBar; 