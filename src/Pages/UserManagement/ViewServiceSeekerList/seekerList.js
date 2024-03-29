import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Menu } from 'antd';
import { FaEllipsisV, FaAngleLeft, FaStar } from 'react-icons/fa';
import UserDetails from './userDetails';

function SeekerList({ searchTerm }) {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false)


  useEffect(() => {
    if (!searchTerm) {
      // If searchTerm is empty, show all users
      setLoading(true);
      fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => {
          setDataSource(data.users);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } else {
      // Filter users based on search term
      const filteredData = dataSource.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDataSource(filteredData);
    }
  }, [searchTerm]);

  const handleMenuClick = (record, key) => {
    if (key === 'suspend') {
      // Handle suspend action
      console.log('Suspend:', record);
    } else if (key === 'delete') {
      // Handle delete action
      console.log('Delete:', record);
    } else {
      // Handle suspend duration
      console.log('Suspend duration:', key, record);
    }
  };

  const renderActions = (text, record) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => handleMenuClick(record, key)}>
          <Menu.SubMenu title="Suspend">
            <Menu.Item key="5_hours">5 hours</Menu.Item>
            <Menu.Item key="1_day">1 day</Menu.Item>
            <Menu.Item key="1_week">1 week</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="delete">Delete</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <span className="ellipsis-icon">
        <FaEllipsisV />
      </span>
    </Dropdown>
  );

  const handleUserClick = user => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleBackToList = () => {
    setShowUserDetails(false); // Hide user details when back button is clicked
    setSelectedUser(null); // Reset selected user
  };

  return (
    <div className="scrollable-table">
      {showUserDetails ? (
        <UserDetails user={selectedUser} onBack={handleBackToList} />
      ) : (
        <Table
          style={{ width: '100%' }}
          components={{
            body: {
              cell: ({ children }) => <td>{children}</td>
            }
          }}
          size='small'
          columns={[
            {
              dataIndex: "image",
              align: 'center',
              width: '100px',
              render: (url, record) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <img src={url} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleUserClick(record)} />
                </div>
              ),
            },
            {
              dataIndex: "firstName",
              render: (text, record) => (
                <span
                  style={{ textAlign: 'left', fontSize: '20px', cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleUserClick(record)}
                >
                  {record.firstName} {record.maidenName} {record.lastName}
                </span>
              )
            },
            {
              dataIndex: 'actions',
              render: renderActions,
              width: '50px',
              align: 'center'
            }
          ]}
          loading={loading}
          dataSource={dataSource.map(item => ({ ...item, key: item.id }))}
          pagination={false}
        />
      )}
    </div>
  );
}

export default SeekerList;