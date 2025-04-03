import React from "react";
import styles from './profileadd.module.css';
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
import Img from '../../assets/img.png';

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
                    <div className={styles.menuItem} style={{ backgroundColor: '#C2A67D'}}>
                        <div className={styles.menuIcon}>
                            <img src={inventoryIcon} alt="Inventory" />
                        </div>
                        <div className={styles.menuText}>Inventory</div>
                    </div>
                     </Link>
                    
                     <Link to="/order" style={{textDecoration:'none'}}>
                    <div className={styles.menuItem}>
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

                    <Link to="/profile" style={{textDecoration:'none'}}>
                    <button className={styles.activeOption2}>
                        <img src={perfilIcon} alt="Profile" className={styles.icon} /> My Profile
                    </button>
                    </Link>
                 

                    <Link to="/profileadd" style={{textDecoration:'none'}}>
                    <button className={styles.activeOption}>
                        <img src={accessIcon} alt="Access" className={styles.icon} /> Manage Access
                    </button>
                    </Link>

                    <Link to="/login" style={{textDecoration:'none'}}>
                    <button className={styles.activeOption3}>
                        <img src={logoutIcon2} alt="Logout" className={styles.icon} /> Logout
                    </button>
                    </Link>
                   
                    </div>


                    {/* Información personal (derecha) */}
                    <div className={styles.personalInfo}>
                        <h2 style={{width: '353px', height: '38px'}}>Admin Personal Information</h2>
                        <div className={styles.profileHeader}>
                        <div className={styles.imageContainer}>
                            <img src={Img} alt="User" className={styles.profilePicture} />
                            <img src={lapizIcon} alt="Edit" className={styles.editIcon} />
                        </div>
                      
                    </div>


                        <form className={styles.profileForm}>
                            <div className={styles.Names}>
                            <div>
                                <label>First Name</label>
                                <input type="firstname" />
                            </div>
                            <div>
                                <label>UserName</label>
                                <input type="usarname" />
                            </div>
                            </div>

                            <label>Email</label>
                            <input type="email"  />

                            <label>Address</label>
                            <input type="text"  />

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
                                <button className={styles.addButton}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            
        </div>
    );
};

export default Profile;