import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Menu } from 'antd';
import { FaEllipsisV, FaAngleLeft, FaStar } from 'react-icons/fa';


function UserDetails({ user, onBack }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseProfile = () => {
    setSelectedUser(null);
  };

  const renderActions = (text, record) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => handleMenuClick(record, key)}>
          <Menu.Item key="reward">Reward</Menu.Item>
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

  const handleItemClick = (record) => {
    setSelectedUser(record);
  };




  const handleMenuClick = (record, key) => {
    // Define your logic here
    console.log(`Menu item "${key}" clicked for record:`, record);
  };

  const handleSubMenuClick = (record, action) => {
    // Define your logic here
    console.log(`Performing action "${action}" for record:`, record);
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
      <div className="ProviderDetailCard">
        <div className="ProviderDetailCardTitle">{title}</div>
        <div className="ProviderDetailCardValue">{value}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="profileHeader">
        <div className="back-button" onClick={onBack}>
          <FaAngleLeft />
        </div>
        <div className="profile-picture-container">
          <img className="profile-picture" src={user.image} alt="Profile" />
        </div>
        <div>
          <p className="profile-username">{user.firstName} {user.lastName}</p>
          {renderStarRating((user.id))}
        </div>
        <div className="profile-actions">
          {renderActions()}
        </div>
      </div>

      <div className="profileBody">
            <div className='leftSide'>
              <UserDetails userDetails={user} />
              <div className='ServicesOffered'>Services Offered:</div>
              
            </div>
            <div class="verticalLine"></div>
            <div className="userDetailCardsContainerProvider">
                <UserDetailCard title={"Completed Services"} value={user.age} />
                <UserDetailCard title={"Reports Received"} value={user.height} />
                <UserDetailCard title={"Violation Record"} value={user.id} />
            </div>
            <div className='Performance'>For graphs:</div>
          </div>
    </div>
  );
}

export default UserDetails