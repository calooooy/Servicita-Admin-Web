import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import ProviderList from './providerList';

function ViewServiceProviderList() {
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log('Search term:', searchTerm);
  };

  return (
    <div style={{ width: '100%' }}>
      <h1 className='DashboardHeader'>View Service Provider List</h1>
      <hr className='Divider' style={{ width: '1185px' }} />
      <div style={{ width: '1150px' }}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        <ProviderList></ProviderList>
      </div>

    </div>
  );
}

export default ViewServiceProviderList;
