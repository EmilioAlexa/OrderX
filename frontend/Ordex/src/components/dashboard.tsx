
import '../assets/style/dashboard.css'; // Asegúrate de que el CSS esté correctamente ubicado

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

import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="sidebar"></div>
      <div className="dashboard-text">Dashboard</div>
      <div className="icon-1">
        <img src={arrowIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
      </div>

      <div className="icon-3">
        <img src={notificationIcon} alt="" style={{ height: '40px' }} />
      </div>

      <Link to="/profile" style={{textDecoration:'none'}}>
      <img
        className="profile-image"
        src={profileIcon}
        alt="Imagen de perfil"
        style={{ cursor: 'pointer', marginTop: '12px' }}
      />
      </Link>

      {/* Tarjeta 1: Daily Sales */}
      <div className="card card-1">
        <div className="card-background"></div>
        <div className="card-title">Daily Sales</div>
        <div className="card-date">9 February 2024</div>
        <div className="card-chart">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`bar bar-${i + 1}`}></div>
          ))}
        </div>
        <div className="card-icon" style={{ marginLeft: '300px', marginTop: '15px' }}>
          <img src={moneyIcon} alt="" style={{ marginLeft: '8px', marginTop: '8px' }} />
        </div>
        <div className="card-value">$2k</div>
      </div>

      {/* Tarjeta 2: Monthly Revenue */}
      <div className="card card-2">
        <div className="card-background"></div>
        <div className="card-title">Monthly Revenue</div>
        <div className="card-date">1 Jan - 1 Feb</div>
        <div className="card-chart">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`bar bar-${i + 1}`}></div>
          ))}
        </div>
        <div className="card-icon" style={{ marginLeft: '300px', marginTop: '15px' }}>
          <img src={revenueIcon} alt="" style={{ marginLeft: '8px', marginTop: '8px' }} />
        </div>
        <div className="card-value">$55k</div>
      </div>

      {/* Tarjeta 3: Table Occupancy */}
      <div className="card card-3">
        <div className="card-background"></div>
        <div className="card-title">Table Occupancy</div>
        <div className="card-chart">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`bar bar-${i + 1}`}></div>
          ))}
        </div>
        <div className="card-value">25 Tables</div>
        <div className="card-icon" style={{ marginLeft: '300px', marginTop: '15px' }}>
          <img src={tableIcon} alt="" style={{ marginLeft: '8px', marginTop: '8px' }} />
        </div>
      </div>

      {/* Sección Overview */}
      <div className="overview">
        <div className="overview-background"></div>
        <div className="overview-title">Overview</div>
        <div className="export-button" style={{ cursor: 'pointer' }}>
          <div className="export-text">
            <img src={exportIcon} alt="" style={{ marginRight: '6px' }} />
            Export
          </div>
        </div>
        <div className="time-selector">
          <div className="time-option monthly">Monthly</div>
          <div className="time-option">Daily</div>
          <div className="time-option">Weekly</div>
        </div>
        <div className="months">
          {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month, i) => (
            <div key={i} className="month">{month}</div>
          ))}
        </div>
        <div className="y-axis">
          {['5k', '4k', '3k', '2k', '1k', '0'].map((value, i) => (
            <div key={i} className="y-value">{value}</div>
          ))}
        </div>
        <div className="grid-lines">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="line"></div>
          ))}
        </div>
        <div className="legend">
          <div className="legend-item sales"></div>
          <div className="legend-text sales-text">Sales</div>
          <div className="legend-item revenue"></div>
          <div className="legend-text revenue-text">Revenue</div>
        </div>
        <div className="chart-area"></div>
        <div className="chart-highlight"></div>
        <div className="chart-marker"></div>
      </div>

      {/* Sección Popular Dishes */}
      <div className="popular-dishes">
        <div className="dishes-background"></div>
        <div className="dishes-title">Popular Dishes</div>
        <div className="see-all" style={{ cursor: 'pointer' }}>See All</div>
        <div className="scroll-bar"></div>
        <div className="scroll-thumb"></div>
        <div className="dish" style={{ marginTop: '80px', marginLeft: '30px' }}>
          <img src={chickenDish} alt="Chicken Parmesan" />
          <div className="dish-name">Chicken Parmesan</div>
          <div className="dish-details">Serving : 01 person</div>
          <div className="dish-price">$55.00</div>
          <div className="dish-status in-stock">In Stock</div>
        </div>

        <div className="dish" style={{ marginTop: '180px', marginLeft: '30px' }}>
          <img src={chickenDish} alt="Chicken Parmesan" />
          <div className="dish-name">Chicken Parmesan</div>
          <div className="dish-details">Serving : 01 person</div>
          <div className="dish-price">$55.00</div>
          <div className="dish-status in-stock">In Stock</div>
        </div>

        <div className="dish" style={{ marginTop: '280px', marginLeft: '30px' }}>
          <img src={chickenDish} alt="Chicken Parmesan" />
          <div className="dish-name">Chicken Parmesan</div>
          <div className="dish-details">Serving : 01 person</div>
          <div className="dish-price">$55.00</div>
          <div className="dish-status in-stock">In Stock</div>
        </div>
        
        {/* Repite la estructura para los otros platos */}
      </div>

      {/* Logout */}
      <Link to="/login" style={{textDecoration:'none'}}>
      <div className="logout" style={{ cursor: 'pointer' }}>
        <div className="logout-icon">
          <img src={logoutIcon} alt="" />
        </div>
        <div className="logout-text">
          <img src={logoutIcon} alt="" />
          Logout
        </div>
      </div>
      </Link>
      

      {/* Logo */}
      <div className="logo">OrderX</div>

      {/* Menú lateral */}
      <div className="menu" >
        <div className="menu-item" style={{ backgroundColor: '#C2A67D'}}>
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
        <Link to="/staff" style={{textDecoration:'none'}}>
        <div className="menu-item">
          <div className="menu-icon">
            <img src={staffIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Staff</div>
        </div>
        </Link>
       

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
    </div>
  );
};


export default Dashboard;
