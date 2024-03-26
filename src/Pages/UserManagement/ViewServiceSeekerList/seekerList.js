import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaAngleLeft, FaStar } from 'react-icons/fa';
import { Table, Dropdown, Menu, Space } from 'antd';

function SeekerList() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
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
  }, []);

  const renderName = (text, record) => (
    <span
      style={{ textAlign: 'left', fontSize: '20px', cursor: 'pointer' }}
      onClick={() => handleItemClick(record)}
    >
      {record.firstName} {record.lastName}
    </span>
  );

  const renderImage = (url, record) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={() => handleItemClick(record)}
    >
      <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden' }}>
        <img src={url} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );

  const handleItemClick = (record) => {
    setSelectedUser(record);
  };

  const handleCloseProfile = () => {
    setSelectedUser(null);
  };

  const renderActions = (text, record) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => handleMenuClick(record, key)}>
          <Menu.SubMenu title="Suspend">
            <Menu.Item key="5_hours" onClick={() => handleSubMenuClick(record, '5 hours')}>5 hours</Menu.Item>
            <Menu.Item key="1_day" onClick={() => handleSubMenuClick(record, '1 day')}>1 day</Menu.Item>
            <Menu.Item key="1_week" onClick={() => handleSubMenuClick(record, '1 week')}>1 week</Menu.Item>
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

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star" />);
      } else {
        stars.push(<FaStar key={i} className="empty-star" />);
      }
    }

    return <div className="star-rating">{stars}</div>;
  };

  function UserDetails({ userDetails }) {
    const { email, phone, address } = userDetails;
    const { city, postalCode, state } = address;

    return (
      <div className="user-details-wrapper">
        <div className='tableRow'>
          Email:&nbsp;<span>{email}</span>
        </div>
        <div className='tableRow'>
          Phone:&nbsp;<span>{phone}</span>
        </div>
        <div className='tableRow'>
          Address:&nbsp;<span>{`${city}, ${state}, ${postalCode}`}</span>
        </div>
      </div>
    );
  }

  function UserDetailCard({ title, value }) {
    return (
      <div className="userDetailCard">
        <div className="userDetailCardTitle">{title}</div>
        <div className="userDetailCardValue">{value}</div>
      </div>
    );
  }



  return (
    <div>
      {selectedUser && (
        <div>
          <div className="profileHeader">
            {/* Back button */}
            <div className="back-button" onClick={handleCloseProfile}>
              <FaAngleLeft />
            </div>
            {/* Profile picture */}
            <div className="profile-picture-container">
              <img className="profile-picture" src={selectedUser.image} alt="Profile" />
            </div>
            {/* Render detailed user profile details here */}
            <div>
              <p className="profile-username">{selectedUser.firstName} {selectedUser.lastName}</p>
              {/* Star rating frame */}
              {renderStarRating(selectedUser.id)}
              {/* Add more details as needed */}
            </div>

            {/* Profile actions */}
            <div className="profile-actions">
              {renderActions()}
            </div>

          </div>
          <div className="profileBody">
            <div className='leftSide'>
              <div classname='userDetailsContainer'>
                <UserDetails userDetails={selectedUser} />
              </div>
              <div className="userDetailCardsContainer">
                <UserDetailCard title={"Services Availed"} value={selectedUser.age} />
                <UserDetailCard title={"Reports Received"} value={selectedUser.height} />
                <UserDetailCard title={"Violation Record"} value={selectedUser.id} />
              </div>
            </div>
            <div class="verticalLine"></div>
            <div className='rightSide'>
              Preferred Services:
            </div>
          </div>
        </div>
      )}

      {!selectedUser && (
        <div className="scrollable-table">
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
                render: (url, record) => renderImage(url, record),
                width: '100px',
              },
              {
                dataIndex: "firstName",
                render: (text, record) => renderName(text, record)
              },
              {
                dataIndex: 'actions',
                render: renderActions,
                width: '50px',
              }
            ]}
            loading={loading}
            dataSource={dataSource.map(item => ({ ...item, key: item.id }))}
            pagination={false}
          />
        </div>
      )}
    </div>
  );

}

export default SeekerList;
