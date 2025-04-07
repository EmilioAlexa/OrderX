
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OverviewChart from '../components/OverviewChart/OverviewChart';
import '../assets/style/dashboard.css';

// Importación de imágenes
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

  const [selectedRange, setSelectedRange] = useState<'monthly' | 'weekly' | 'daily'>('monthly');
  const monthlyData = [
    { time: '2025-01-01', sales: 1000, revenue: 3000 },
    { time: '2025-02-01', sales: 2000, revenue: 3200 },
    { time: '2025-03-01', sales: 1500, revenue: 3100 },
    { time: '2025-04-01', sales: 3000, revenue: 2900 },
    { time: '2025-05-01', sales: 2500, revenue: 3300 },
    { time: '2025-06-01', sales: 3500, revenue: 3400 },
    { time: '2025-07-01', sales: 4000, revenue: 3600 },
    { time: '2025-08-01', sales: 4500, revenue: 3500 },
    { time: '2025-09-01', sales: 4700, revenue: 3200 },
    { time: '2025-10-01', sales: 4200, revenue: 3100 },
    { time: '2025-11-01', sales: 4800, revenue: 2600 },
    { time: '2025-12-01', sales: 5000, revenue: 3000 },
  ];

  const weeklyData = [
    { time: 'Week 1', sales: 800, revenue: 2000 },
    { time: 'Week 2', sales: 1500, revenue: 2500 },
    { time: 'Week 3', sales: 1000, revenue: 2200 },
    { time: 'Week 4', sales: 1800, revenue: 2700 },
  ];

  const dailyData = [
    { time: 'Mon', sales: 300, revenue: 700 },
    { time: 'Tue', sales: 500, revenue: 1200 },
    { time: 'Wed', sales: 400, revenue: 1000 },
    { time: 'Thu', sales: 600, revenue: 1300 },
    { time: 'Fri', sales: 550, revenue: 1250 },
    { time: 'Sat', sales: 700, revenue: 1500 },
    { time: 'Sun', sales: 650, revenue: 1400 },
  ];

  const getChartData = () => {
    switch (selectedRange) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      default:
        return monthlyData;
    }
  };



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
      <div className="overview-title">Overview</div>

      {/* Botones de cambio */}
      <div className="time-selector">
        {['monthly', 'daily', 'weekly'].map((range) => (
          <div
            key={range}
            className={`time-option ${range} ${selectedRange === range ? 'active' : ''}`}
            onClick={() => setSelectedRange(range as 'monthly' | 'daily' | 'weekly')}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="chart-area" style={{ height: '300px', marginTop: '20px' }}>
        <OverviewChart 
          data={getChartData()} 
          color="#C2A67D" 
          height={300}
          range={selectedRange} // <-- Nuevo prop
        />
      </div>

      {/* Leyenda */}
      <div className="legend">
        <div className="legend-item sales" style={{ backgroundColor: '#C2A67D' }}></div>
        <div className="legend-text sales-text">Sales</div>
        <div className="legend-item revenue" style={{ backgroundColor: '#EDEDED' }}></div>
        <div className="legend-text">Revenue</div>
      </div>
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

        <Link to="/menu" style={{textDecoration:'none'}}>
        <div className="menu-item">
          <div className="menu-icon">
            <img src={bookIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Menu</div>
        </div>
                  </Link>

        <Link to="/staff" style={{textDecoration:'none'}}>
        <div className="menu-item">
          <div className="menu-icon">
            <img src={staffIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Staff</div>
        </div>
        </Link>
       
        <Link to="/inventory" style={{textDecoration:'none'}}>
                  <div className="menu-item">
          <div className="menu-icon">
            <img src={inventoryIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Inventory</div>
        </div>
                  </Link>
        
                  <Link to="/order" style={{textDecoration:'none'}}>
                  <div className="menu-item">
          <div className="menu-icon">
            <img src={orderIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
          </div>
          <div className="menu-text">Order/Table</div>
        </div>
                  </Link>

      </div>
    </div>
  );
};


export default Dashboard;
