import React, { useState } from 'react';
import { FaSearch, FaSlidersH, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [sortBy, setSortBy] = useState(null); // Track the sorting state

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
  
    // Reset dropdown to default option (e.g., Option 1)
    const dropdown = document.getElementById('filter-dropdown');
    dropdown.selectedIndex = 0;
  
    const flaggedCheckbox = document.getElementById('flagged-providers-checkbox');
    flaggedCheckbox.checked = false;
  
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

const Sidebar = ({ onClose, sortBy, onSort, resetFilters }) => {
  return (
    <div className="sidebar">
      <div className='sidebar-header'>
        <div className='filterHeader'>
          Filter by
          <button onClick={onClose} className='close-button'>
            <FaTimes />
          </button>
        </div>
      </div>
      <div className='sidebar-body'>
        <div className="dropdown-container">
          <label htmlFor="location-dropdown">Location</label>
          <select id="filter-dropdown">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            {/* Add more options as needed */}
          </select>
          <div className="checkbox-container">
            <div className="label-and-buttons-container">
              <label htmlFor="AlphabeticalOrder">Alphabetical Order</label>
              <div className="sorting-buttons">
                <button
                  className={`sort-button ${sortBy === 'asc' && 'active'}`}
                  onClick={() => onSort('asc')}
                >
                  ▲
                </button>
                <button
                  className={`sort-button ${sortBy === 'desc' && 'active'}`}
                  onClick={() => onSort('desc')}
                >
                  ▼
                </button>
              </div>
            </div>
            <div className="flagged-providers">
              <label htmlFor="flagged-providers-checkbox">Flagged Providers</label>
              <input className='flaggedCheckbox' type="checkbox" id="flagged-providers-checkbox" />
            </div>
          </div>
        </div>
        <div className="sidebar-buttons">
          <button className="reset-button" onClick={resetFilters}>Reset</button>
          <button className="apply-button">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
