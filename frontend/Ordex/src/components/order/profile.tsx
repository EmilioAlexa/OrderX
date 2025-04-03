import React from "react";
import styles from './profile.module.css';
import dashboardIcon from '../../assets/dashboard-icon.png';
import bookIcon from '../../assets/book-icon.png';
import staffIcon from '../../assets/staff-icon.png';
import inventoryIcon from '../../assets/inventory-icon.png';
import orderIcon from '../../assets/order-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
import arrowIcon from '../../assets/chevron-down.svg';
import campana from '../../assets/Captura de pantalla 2025-03-31 225150.png';
import line from '../../assets/Vector 139.svg';
import perfil from '../../assets/Ellipse 1.svg';
import perfil2 from '../../assets/Ellipse 2.png';
import perfilIcon from '../../assets/tabler_user-filled.svg';
import accessIcon from '../../assets/lets-icons_setting-fill.svg';
import logoutIcon2 from '../../assets/majesticons_logout.svg';
import lapizIcon from '../../assets/lapiz.svg'
import menu from '../../assets/order.png'

import { Link } from 'react-router-dom';


const Profile: React.FC = () => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.sidebar}>
                <div className={styles.logo}>OrderX</div>
                
                <div className={styles.menu}>
                <Link to="/dashboard" style={{textDecoration:'none'}}>
                <div className={styles.menuItem}>
                        <div className={styles.menuIcon}>
                            <img src={dashboardIcon} alt="Dashboard" />
                        </div>
                        <div className={styles.menuText}>Dashboard</div>
                    </div>
                </Link>
                    
                <Link to="/menu" style={{textDecoration:'none'}}>
                <div className={styles.menuItem}>
                        <div className={styles.menuIcon}>
                            <img src={bookIcon} alt="Menu" />
                        </div>
                        <div className={styles.menuText}>Menu</div>
                    </div>
           </Link>
                   
                    
                    <Link to="/staff" style={{textDecoration:'none'}}>
                    <div className={styles.menuItem}>
                        <div className={styles.menuIcon}>
                            <img src={staffIcon} alt="Staff" />
                        </div>
                        <div className={styles.menuText}>Staff</div>
                    </div>
                    </Link>
                    
                    <Link to="/inventory" style={{textDecoration:'none'}}>
                    <div className={styles.menuItem}>
                        <div className={styles.menuIcon}>
                            <img src={inventoryIcon} alt="Inventory" />
                        </div>
                        <div className={styles.menuText}>Inventory</div>
                    </div>
            </Link>
                   
                    <Link to="/order" style={{textDecoration:'none'}}>
                    <div className={styles.menuItem} style={{ backgroundColor: '#C2A67D'}}>
                        <div className={styles.menuIcon}>
                            <img src={orderIcon} alt="Order/Table" />
                        </div>
                        <div className={styles.menuText}>Order/Table</div>
                    </div>
            </Link>
                  
                </div>
                <Link to="/login" style={{textDecoration:'none'}}>
                <div className={styles.logoutContainer}>
                    <div className={styles.logoutIcon}>
                        <img src={logoutIcon} alt="Logout"/>
                    </div>
                    <div>Logout</div>
                </div>
                </Link>
                
            </div>
            
           <img src={menu} alt="" style={{ marginTop: '40px', marginLeft: '40px' }}/>
        </div>
    );
};

export default Profile;