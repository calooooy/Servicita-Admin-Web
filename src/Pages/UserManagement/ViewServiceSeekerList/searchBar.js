// searchBar.js
import React, { useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import Sidebar from './sideBar';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [sortBy, setSortBy] = useState(null); // Track the sorting state

  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Pass search term to parent component
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Search term:', searchTerm);
    onSearch(searchTerm);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSortBy(null);

    // Reset location dropdown to default option (e.g., Option 1)
    const locationDropdown = document.getElementById('location-dropdown1');
    locationDropdown.selectedIndex = 0;

    // Reset flagged provider checkbox
    const flaggedCheckbox = document.getElementById('flagged-providers-checkbox');
    flaggedCheckbox.checked = false;

    // Remove active class from sorting buttons
    const sortButtons = document.querySelectorAll('.sort-button');
    sortButtons.forEach(btn => btn.classList.remove('active'));
  };

  const handleSort = (sortByValue) => {
    if (sortBy === sortByValue) {
      // Toggle sorting order if the same button is clicked again
      setSortBy(null); // Reset sorting
    } else {
      setSortBy(sortByValue);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
          />
          <FaSlidersH 
            className="filter-icon" 
            onClick={toggleSidebar}
            />
        </div>
      </form>
      {showSidebar && (
        <Sidebar onClose={closeSidebar} sortBy={sortBy} onSort={handleSort} resetFilters={resetFilters} />
      )}
    </div>
  );
};

export default SearchBar;
