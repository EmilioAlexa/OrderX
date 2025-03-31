import React from 'react';
import '../assets/style/staff.css';
import arrowIcon from '../assets/arrow-icon.png';
import notificationIcon from '../assets/notification-ico.png';
import profileIcon from '../assets/profile-icon.png';
import moneyIcon from '../assets/money-icon.png';
import revenueIcon from '../assets/revenue-icon.png';
import tableIcon from '../assets/table-icon.png';
import exportIcon from '../assets/export-icon.png';
import logoutIcon from '../assets/logout-icon.png';
import dashboardIcon from '../assets/dashboard-icon.png';
import bookIcon from '../assets/book-icon.png';
import staffIcon from '../assets/staff-icon.png';
import inventoryIcon from '../assets/inventory-icon.png';
import orderIcon from '../assets/order-icon.png';
import chickenDish from '../assets/chicken.png';
import Dots from '../assets/dots.png';
const StaffManagement: React.FC = () => {
  return (
    <div className="container">
      <div className="sidebar"></div>
      <div className="logo">OrderX</div>
      
      <div className="menu" >
        <div className="menu-item" >
          <div className="menu-icon">
            <img src={dashboardIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Dashboard</div>
        </div>
        <div className="menu-item">
          <div className="menu-icon">
            <img src={bookIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Menu</div>
        </div>
        <div className="menu-item" style={{ backgroundColor: '#C2A67D'}}>
          <div className="menu-icon">
            <img src={staffIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Staff</div>
        </div>
        <div className="menu-item">
          <div className="menu-icon">
            <img src={inventoryIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Inventory</div>
        </div>
        <div className="menu-item">
          <div className="menu-icon">
            <img src={orderIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Order/Table</div>
        </div>
      </div>
      
      <div className="logout-icon">
      <img src={logoutIcon} alt=""/>
      </div>
      <div className="logout-container">Logout</div>
      
      <div className="page-title">Staff Management</div>
      <div className="back-button"></div>
      <div className="back-arrow">
      <img src={arrowIcon} alt=""/>
      </div>
      
    
      <div className="icon-3">
        <img src={notificationIcon} alt="" style={{ height: '40px'}} />
      </div>
      <img className="profile-pic" src={profileIcon} alt="Profile" />
      
      <div className="staff-title">Staff (22)</div>
      
      <div className="add-staff-btn">
        <div className="add-staff-text">Add Staff</div>
      </div>
      
      <div className="sort-by-btn">
        <div className="sort-by-text">Sort by</div>
        <div className="sort-arrow">
        <img src={arrowIcon} alt=""/>
        </div>
      </div>
      
      <div className="column-header" style={{left: '1095px', top: '278px'}}>Salary</div>
      <div className="column-header" style={{left: '1205px', top: '278px'}}>Timings</div>
      <div className="column-header" style={{left: '555px', top: '278px'}}>Email</div>
      <div className="column-header" style={{left: '833px', top: '278px'}}>Phone</div>
      <div className="column-header" style={{left: '1015px', top: '278px', textAlign: 'right'}}>Age</div>
      <div className="column-header" style={{left: '227px', top: '278px'}}>ID</div>
      <div className="column-header" style={{left: '287px', top: '278px'}}>Name</div>
      <div className="checkbox" style={{left: '196px', top: '284px'}}></div>
      
      <div className="tabs">
        <div className="tab-active">
          <div className="add-staff-text">Staff Management</div>
        </div>
        <div className="tab-inactive">Attendance</div>
      </div>
      
      <div className="staff-list">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`staff-row ${i % 2 === 0 ? 'staff-row-dark' : 'staff-row-light'}`}>
            <div className="staff-cell" style={{left: '906px', top: '19px'}}>$2200.00</div>
            <div className="staff-cell" style={{left: '1003px', top: '19px'}}>9am to 6pm</div>
            <div className="staff-cell" style={{left: '384px', top: '19px'}}>watsonjoyce112@gmail.com</div>
            <div className="staff-cell" style={{left: '662px', top: '19px'}}>+1 (123) 123 4654</div>
            <div className="staff-cell" style={{left: '838px', top: '19px'}}>45 yr</div>
            <div className="staff-cell" style={{left: '56px', top: '19px'}}>#101</div>
            <div className="staff-dots" style={{left: '1170px', top: '19px'}}><img src={Dots} alt=""/></div>
            
            <div className="staff-info" style={{left: '116px', top: '10px'}}>
              <img className="staff-avatar" src={profileIcon} alt="Staff" />
              <div className="staff-details">
                <div className="staff-name">Watson Joyce</div>
                <div className="staff-role">Manager</div>
              </div>
            </div>
            
            <div className="checkbox" style={{left: '25px', top: '24px'}}></div>
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default StaffManagement;