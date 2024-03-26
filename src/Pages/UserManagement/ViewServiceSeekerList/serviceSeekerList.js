// ViewServiceSeekerList.js

import React from 'react';
import SearchBar from './searchBar';
import SeekerList from './seekerList';

function ViewServiceSeekerList() {
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log('Search term:', searchTerm);
  };

  return (
    <div style={{ width: '100%' }}>
      <h1 className='DashboardHeader'>View Service Seeker List</h1>
      <hr className='Divider' style={{ width: '1185px' }} />
      <div style={{ width: '1150px' }}>
        <SearchBar onSearch={handleSearch} /> {/* Use SearchBar component */}
      </div>
      <div>
        <SeekerList /> {/* Use SeekerList component */}
      </div>
    </div>
  );
}

export default ViewServiceSeekerList;
