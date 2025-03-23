import React from 'react';
import '../assets/style/styles.css'; // Asegúrate de que el CSS esté correctamente ubicado

// Importación de imágenes si están en src/assets/
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

const Dashboard = () => {
  return (
    <div className="container">
      <div className="sidebar"></div>
      <div className="dashboard-text">Dashboard</div>
      <div className="icon-1">
        <img src={arrowIcon} alt="Arrow Icon" style={{ marginLeft: '6px', marginTop: '6px' }} />
      </div>

      <div className="icon-3">
        <img src={notificationIcon} alt="Notification Icon" style={{ height: '40px' }} />
      </div>

      <img
        className="profile-image"
        src={profileIcon}
        alt="Profile Icon"
        style={{ cursor: 'pointer', marginTop: '12px' }}
      />

      {/* Tarjeta de Ventas Diarias */}
      <div className="card card-1">
        <div className="card-title">Daily Sales</div>
        <div className="card-date">9 February 2024</div>
        <div className="card-icon">
          <img src={moneyIcon} alt="Money Icon" />
        </div>
        <div className="card-value">$2k</div>
      </div>

      {/* Tarjeta de Ingresos Mensuales */}
      <div className="card card-2">
        <div className="card-title">Monthly Revenue</div>
        <div className="card-date">1 Jan - 1 Feb</div>
        <div className="card-icon">
          <img src={revenueIcon} alt="Revenue Icon" />
        </div>
        <div className="card-value">$55k</div>
      </div>

      {/* Tarjeta de Ocupación de Mesas */}
      <div className="card card-3">
        <div className="card-title">Table Occupancy</div>
        <div className="card-value">25 Tables</div>
        <div className="card-icon">
          <img src={tableIcon} alt="Table Icon" />
        </div>
      </div>

      {/* Sección Overview */}
      <div className="overview">
        <div className="overview-title">Overview</div>
        <div className="export-button">
          <img src={exportIcon} alt="Export Icon" /> Export
        </div>
      </div>

      {/* Sección Popular Dishes */}
      <div className="popular-dishes">
        <div className="dishes-title">Popular Dishes</div>
        <div className="dish">
          <img src={chickenDish} alt="Chicken Parmesan" />
          <div className="dish-name">Chicken Parmesan</div>
          <div className="dish-details">Serving: 1 person</div>
          <div className="dish-price">$55.00</div>
          <div className="dish-status in-stock">In Stock</div>
        </div>
      </div>

      {/* Logout */}
      <div className="logout">
        <img src={logoutIcon} alt="Logout Icon" />
        <div className="logout-text">Logout</div>
      </div>

      {/* Logo */}
      <div className="logo">OrderX</div>

      {/* Menú lateral */}
      <div className="menu">
        <div className="menu-item active">
          <img src={dashboardIcon} alt="Dashboard Icon" />
          <div className="menu-text">Dashboard</div>
        </div>
        <div className="menu-item">
          <img src={bookIcon} alt="Book Icon" />
          <div className="menu-text">Menu</div>
        </div>
        <div className="menu-item">
          <img src={staffIcon} alt="Staff Icon" />
          <div className="menu-text">Staff</div>
        </div>
        <div className="menu-item">
          <img src={inventoryIcon} alt="Inventory Icon" />
          <div className="menu-text">Inventory</div>
        </div>
        <div className="menu-item">
          <img src={orderIcon} alt="Order Icon" />
          <div className="menu-text">Order/Table</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
