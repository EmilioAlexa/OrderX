import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../middleware/api"; // Tu configuración de Axios
import styles from './profile.module.css';

// Importación de imágenes
import dashboardIcon from '../../assets/dashboard-icon.png';
import bookIcon from '../../assets/book-icon.png';
import staffIcon from '../../assets/staff-icon.png';
import inventoryIcon from '../../assets/inventory-icon.png';
import orderIcon from '../../assets/order-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
import arrowIcon from '../../assets/chevron-down.svg';
import campana from '../../assets/Captura de pantalla 2025-03-31 225150.png';
import line from '../../assets/Vector 139.svg';
import perfil2 from '../../assets/Ellipse 2.png';
import perfilIcon from '../../assets/tabler_user-filled.svg';
import accessIcon from '../../assets/lets-icons_setting-fill.svg';
import logoutIcon2 from '../../assets/majesticons_logout.svg';
import lapizIcon from '../../assets/lapiz.svg';

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId"); // Obtener el ID del usuario desde el localStorage
        if (userId) {
            api.get(`/users/${userId}`)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener datos del usuario:", error);
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login"); // Redirigir a la página de login
    };

     const [showModal, setShowModal] = useState(false);
    
      const handleCampanaClick = () => {
        setShowModal(true);
      };
      
      const closeModal = () => {
        setShowModal(false);
      };
    

    return (
        <div className={styles.profileContainer}>
            <div className={styles.sidebar}>
                <div className={styles.logo}>OrderX</div>
                
                <div className={styles.menu}>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
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
                    

                    <Link to="/staff" style={{ textDecoration: 'none' }}>
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

            {/* Título y botón */}
            <div className={styles.conteinerTitlePr}>
                <div className={styles.buttonCircle}>
                    <img src={arrowIcon} alt="Back" className={styles.arrowIcon} />
                </div>
                <div className={styles.profileTitle}>Profile</div>
            </div>

            {/* Iconos */}
            <div className={styles.conteinerIconosPer}>
                <div className={styles.campanaIcon} onClick={handleCampanaClick} style={{ cursor: 'pointer' }}>
                <img src={campana} alt="Notification" className={styles.campanaImg} />
                </div>
                <div>
                <img src={line} alt="Divider" className={styles.lineImg} />
                </div>
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                <div className={styles.perfilIcon}>
                    <img src={perfil2} alt="Profile" className={styles.perfilPhoto} />
                </div>
                </Link>
            </div>

            {showModal && (
            <div className={styles.modalTopLeft}>
                <p>No movements or updates</p>
                <button  onClick={closeModal}>Exit</button>
            </div>
            )}


            {/* Contenido del perfil (dos columnas) */}
            <div className={styles.profileContent}>
                {/* Panel de opciones (izquierda) */}
                <div className={styles.profileOptions}>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <button className={styles.activeOption}>
                            <img src={perfilIcon} alt="Profile" className={styles.icon} /> My Profile
                        </button>
                    </Link>
                
                    <Link to="/profileadd" style={{ textDecoration: 'none' }}>
                        <button className={styles.activeOption2}>
                            <img src={accessIcon} alt="Access" className={styles.icon} /> Manage Access
                        </button>
                    </Link>

                    <button className={styles.activeOption3} onClick={handleLogout}>
                        <img src={logoutIcon2} alt="Logout" className={styles.icon} /> Logout
                    </button>
                </div>

                {/* Información personal (derecha) */}
                <div className={styles.personalInfo}>
                    <h2>Personal Information</h2>
                    <div className={styles.profileHeader}>
                        <div className={styles.imageContainer}>
                        <img 
                        src={user?.imagen_url || perfil2} 
                        alt="User" 
                        className={styles.profilePicture} 
                        onError={(e) => {
                            // Si la imagen falla al cargar, mostrar la imagen por defecto
                            (e.target as HTMLImageElement).src = perfil2;
                        }}
                    />
                            <img src={lapizIcon} alt="Edit" className={styles.editIcon} />
                        </div>
                        <div>
                            <h3>{user ? user.name : "Loading..."}</h3>
                            <p>{user ? user.role : "Loading..."}</p>
                        </div>
                    </div>

                    <form className={styles.profileForm}>
                        <label>First Name</label>
                        <input type="text" value={user ? user.name : ""} readOnly />

                        <label>Email</label>
                        <input type="email" value={user ? user.email : ""} readOnly />

                        <label>Address</label>
                        <input type="text" value={user ? user.address || "Not provided" : ""} readOnly />

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
                            <button className={styles.discardButton} type="reset">Discard Changes</button>
                            <button className={styles.saveButton} type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
