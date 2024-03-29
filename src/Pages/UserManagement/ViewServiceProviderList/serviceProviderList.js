import React, { useState } from 'react';
import SearchBar from './searchBar';
import ProviderList from '../ViewServiceProviderList/providerList';

function ViewServiceProviderList() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div style={{ width: '100%' }}>
      <h1 className='DashboardHeader'>View Service Provider List</h1>
      <hr className='Divider' style={{ width: '1185px' }} />
      <div style={{ width: '1150px' }}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        <ProviderList searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default ViewServiceProviderList;
