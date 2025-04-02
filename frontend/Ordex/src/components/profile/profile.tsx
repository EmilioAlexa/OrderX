import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../api/userapi";
import { Link } from "react-router-dom";
import styles from "./profile.module.css";

import dashboardIcon from "../../assets/dashboard-icon.png";
import bookIcon from "../../assets/book-icon.png";
import staffIcon from "../../assets/staff-icon.png";
import inventoryIcon from "../../assets/inventory-icon.png";
import orderIcon from "../../assets/order-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import arrowIcon from "../../assets/chevron-down.svg";
import campana from "../../assets/Captura de pantalla 2025-03-31 225150.png";
import line from "../../assets/Vector 139.svg";
import perfil from "../../assets/Ellipse 1.svg";
import perfil2 from "../../assets/Ellipse 2.png";
import perfilIcon from "../../assets/tabler_user-filled.svg";
import accessIcon from "../../assets/lets-icons_setting-fill.svg";
import logoutIcon2 from "../../assets/majesticons_logout.svg";
import lapizIcon from "../../assets/lapiz.svg";

const Profile: React.FC = () => {
    const [user, setUser] = useState({
        id_user: 0,
        username: "",
        email: "",
        address: "",
        password: "",
    });

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const userId = 1; // 🔹 Debes obtener esto de la autenticación (ejemplo: localStorage)

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserById(userId);
                setUser(data);
            } catch (error) {
                console.error("Error cargando el perfil:", error);
            }
        };
        fetchUserData();
    }, [userId]);

    // Manejar cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    // Guardar cambios en el perfil
    const handleSave = async () => {
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            await updateUser(user.id_user, {
                username: user.username,
                email: user.email,
                address: user.address,
                password: newPassword || undefined, // Solo envía si hay un nuevo password
            });
            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            alert("Hubo un error al actualizar");
        }
    };

    return (
        <div className={styles.profileContainer}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.logo}>OrderX</div>
                <div className={styles.menu}>
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                        <div className={styles.menuItem}>
                            <img src={dashboardIcon} alt="Dashboard" />
                            <div className={styles.menuText}>Dashboard</div>
                        </div>
                    </Link>
                    <div className={styles.menuItem}>
                        <img src={bookIcon} alt="Menu" />
                        <div className={styles.menuText}>Menu</div>
                    </div>
                    <Link to="/staff" style={{ textDecoration: "none" }}>
                        <div className={styles.menuItem}>
                            <img src={staffIcon} alt="Staff" />
                            <div className={styles.menuText}>Staff</div>
                        </div>
                    </Link>
                    <div className={styles.menuItem}>
                        <img src={inventoryIcon} alt="Inventory" />
                        <div className={styles.menuText}>Inventory</div>
                    </div>
                    <div className={styles.menuItem}>
                        <img src={orderIcon} alt="Order/Table" />
                        <div className={styles.menuText}>Order/Table</div>
                    </div>
                </div>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <div className={styles.logoutContainer}>
                        <img src={logoutIcon} alt="Logout" />
                        <div>Logout</div>
                    </div>
                </Link>
            </div>

            {/* Título */}
            <div className={styles.conteinerTitlePr}>
                <div className={styles.buttonCircle}>
                    <img src={arrowIcon} alt="Back" className={styles.arrowIcon} />
                </div>
                <div className={styles.profileTitle}>Profile</div>
            </div>

            {/* Iconos */}
            <div className={styles.conteinerIconosPer}>
                <img src={campana} alt="Notifications" className={styles.campanaImg} />
                <img src={line} alt="Divider" className={styles.lineImg} />
                <Link to="/profile" style={{ textDecoration: "none" }}>
                    <img src={perfil} alt="Profile" className={styles.perfilPhoto} />
                </Link>
            </div>

            {/* Contenido del perfil */}
            <div className={styles.profileContent}>
                {/* Opciones de perfil */}
                <div className={styles.profileOptions}>
                    <button className={styles.activeOption}>
                        <img src={perfilIcon} alt="Profile" className={styles.icon} /> My Profile
                    </button>
                    <button className={styles.activeOption2}>
                        <img src={accessIcon} alt="Access" className={styles.icon} /> Manage Access
                    </button>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <button className={styles.activeOption3}>
                            <img src={logoutIcon2} alt="Logout" className={styles.icon} /> Logout
                        </button>
                    </Link>
                </div>

                {/* Información personal */}
                <div className={styles.personalInfo}>
                    <h2>Personal Information</h2>
                    <div className={styles.profileHeader}>
                        <div className={styles.imageContainer}>
                            <img src={perfil2} alt="User" className={styles.profilePicture} />
                            <img src={lapizIcon} alt="Edit" className={styles.editIcon} />
                        </div>
                        <div>
                            <h3>{user.username || "Usuario"}</h3>
                            <p>Manager</p>
                        </div>
                    </div>

                    <form className={styles.profileForm} onSubmit={(e) => e.preventDefault()}>
                        <label>First Name</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange} />

                        <label>Email</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} />

                        <label>Address</label>
                        <input type="text" name="address" value={user.address} onChange={handleChange} />

                        <div className={styles.passwordContainer}>
                            <div>
                                <label>New Password</label>
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div>
                                <label>Confirm Password</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="button" className={styles.discardButton}>Discard Changes</button>
                            <button type="button" className={styles.saveButton} onClick={handleSave}>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
