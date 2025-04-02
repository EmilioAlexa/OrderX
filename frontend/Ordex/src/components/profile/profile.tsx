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
                    
                    <div className={styles.menuItem}>
                        <div className={styles.menuIcon}>
                            <img src={bookIcon} alt="Menu" />
                        </div>
                        <div className={styles.menuText}>Menu</div>
                    </div>
                    
                    <Link to="/staff" style={{textDecoration:'none'}}>
                    <div className={styles.menuItem}>
                        <div className={styles.menuIcon}>
                            <img src={staffIcon} alt="Staff" />
                        </div>
                        <div className={styles.menuText}>Staff</div>
                    </div>
                    </Link>
                    
                    
                    <div className={styles.menuItem}>
                        <div className={styles.menuIcon}>
                            <img src={inventoryIcon} alt="Inventory" />
                        </div>
                        <div className={styles.menuText}>Inventory</div>
                    </div>
                    
                    <div className={styles.menuItem}>
                        <div className={styles.menuIcon}>
                            <img src={orderIcon} alt="Order/Table" />
                        </div>
                        <div className={styles.menuText}>Order/Table</div>
                    </div>
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
            
            {/* titulo y boton */}

            <div className={styles.conteinerTitlePr}>
            <div className={styles.buttonCircle}>
                <img src={arrowIcon} alt="Back" className={styles.arrowIcon} />
            </div>
            <div className={styles.profileTitle}>Profile</div>
            </div>

            {/* iconos */}

            <div className={styles.conteinerIconosPer}>

                <div className={styles.campanaIcon}>
                    <img src={campana} alt="Back" className={styles.campanaImg} />
                </div>

                <div>
                <img src={line} alt="Back" className={styles.lineImg} />
                </div>
                
                <Link to="/profile" style={{textDecoration:'none'}}>
                <div className={styles.perfilIcon}>
                    <img src={perfil} alt="Back" className={styles.perfilPhoto} />
                </div>
                </Link>

            </div>

            {/* Contenido del perfil (dos columnas) */}

                <div className={styles.profileContent}>
                    {/* Panel de opciones (izquierda) */}
                    <div className={styles.profileOptions}>
                    <button className={styles.activeOption}>
                        <img src={perfilIcon} alt="Profile" className={styles.icon} /> My Profile
                    </button>

                    <button className={styles.activeOption2}>
                        <img src={accessIcon} alt="Access" className={styles.icon} /> Manage Access
                    </button>

                    <Link to="/login" style={{textDecoration:'none'}}>
                    <button className={styles.activeOption3}>
                        <img src={logoutIcon2} alt="Logout" className={styles.icon} /> Logout
                    </button>
                    </Link>
                   
                    </div>


                    {/* Información personal (derecha) */}
                    <div className={styles.personalInfo}>
                        <h2 style={{width: '264px', height: '38px'}}>Personal Information</h2>
                        <div className={styles.profileHeader}>
                        <div className={styles.imageContainer}>
                            <img src={perfil2} alt="User" className={styles.profilePicture} />
                            <img src={lapizIcon} alt="Edit" className={styles.editIcon} />
                        </div>
                        <div>
                            <h3>John Doe</h3>
                            <p>Manager</p>
                        </div>
                    </div>


                        <form className={styles.profileForm}>
                            <label>First Name</label>
                            <input type="text" value="John Doe" />

                            <label>Email</label>
                            <input type="email" value="johndoe123@gmail.com" />

                            <label>Address</label>
                            <input type="text" value="123 Street USA, Chicago" />

                            <div className={styles.passwordContainer}>
                                <div>
                                    <label>New Password</label>
                                    <input type="password" />
                                </div>
                                <div>
                                    <label>Confirm Password</label>
                                    <input type="password" />
                                </div>
                            </div>

                            <div className={styles.buttonGroup}>
                                <button className={styles.discardButton}>Discard Changes</button>
                                <button className={styles.saveButton}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            
        </div>
    );
};

export default Profile;