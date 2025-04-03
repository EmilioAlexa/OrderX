import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from "../middleware/api";
import { Link } from 'react-router-dom';
import '../assets/style/staff.css';
import arrowIcon from '../assets/arrow-icon.png';
import notificationIcon from '../assets/notification-ico.png';
import profileIcon from '../assets/profile-icon.png';
import logoutIcon from '../assets/logout-icon.png';
import dashboardIcon from '../assets/dashboard-icon.png';
import bookIcon from '../assets/book-icon.png';
import staffIcon from '../assets/staff-icon.png';
import inventoryIcon from '../assets/inventory-icon.png';
import orderIcon from '../assets/order-icon.png';
import Dots from '../assets/dots.png';

interface StaffMember {
  id_employee: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  salary: number;
  role_id: number;
  estatus: boolean;
}

const StaffManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showActionsModal, setShowActionsModal] = useState<{
    show: boolean;
    staffId: string | null;
    position: { top: number; left: number } | null;
  }>({ show: false, staffId: null, position: null });
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaffId, setCurrentStaffId] = useState<string | null>(null);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setRowRef = useCallback((el: HTMLDivElement | null, index: number) => {
    rowRefs.current[index] = el;
  }, []);

  const setDotsRef = useCallback((el: HTMLDivElement | null, index: number) => {
    dotsRefs.current[index] = el;
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '2', // Valor por defecto para Chef (ajustar según tus roles)
    phone: '',
    salary: '',
    age: '',
    address: '',
    details: ''
  });
  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('No estás autenticado. Por favor, inicia sesión.');
        setLoading(false);
        return;
      }
  
      try {
        console.log("Token:", token);
        const response = await api.get("/employees", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStaffList(response.data);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
        setError('Error al cargar los empleados. Verifica tu autenticación.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployees();
  }, []);
  
  const handleAddStaffClick = () => {
    setIsEditing(false);
    setCurrentStaffId(null);
    setShowAddStaffModal(true);
    setFormData({
      fullName: '',
      email: '',
      role: '1',
      phone: '',
      salary: '',
      age: '',
      address: '',
      details: ''
    });
  };

  const handleCloseModal = () => {
    setShowAddStaffModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const staffData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      age: parseInt(formData.age),
      salary: parseFloat(formData.salary),
      role_id: 1,
      id_restaurant_fk: 3 // Ajustar según el restaurante correspondiente
    };

    try {
      if (isEditing && currentStaffId) {
        await api.put(`/employees`, staffData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setStaffList(staffList.map(staff => 
          staff.id_employee.toString() === currentStaffId ? {
            ...staff,
            ...staffData
          } : staff
        ));
      } else {
        const response = await api.post('/employees', staffData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setStaffList([...staffList, response.data]);
      }
      
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar empleado:", error);
      setError('Error al guardar el empleado');
    }
  };

  const handleDotsClick = (staffId: string, e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const dotsElement = dotsRefs.current[index];
    if (dotsElement) {
      const rect = dotsElement.getBoundingClientRect();
      setShowActionsModal({
        show: true,
        staffId,
        position: {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX
        }
      });
    }
  };

  const handleCloseActionsModal = () => {
    setShowActionsModal({ show: false, staffId: null, position: null });
  };

  const handleEditStaff = (staffId: string) => {
    const staffToEdit = staffList.find(staff => staff.id_employee.toString() === staffId);
    if (staffToEdit) {
      setIsEditing(true);
      setCurrentStaffId(staffId);
      
      setFormData({
        fullName: staffToEdit.name,
        email: staffToEdit.email,
        role: staffToEdit.role_id.toString(),
        phone: staffToEdit.phone,
        salary: staffToEdit.salary.toString(),
        age: staffToEdit.age.toString(),
        address: '',
        details: ''
      });
      
      setShowAddStaffModal(true);
    }
    handleCloseActionsModal();
  };

  const handleDeleteStaff = async (staffId: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found!");

        await api.delete(`/employees`, {
            data: { id_employee: staffId },  // Corrected key name
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setStaffList(staffList.filter(staff => staff.id_employee.toString() !== staffId));
        handleCloseActionsModal();
    } catch (error: any) {
        console.error("Error al eliminar empleado:", error.response?.data || error.message);
        setError('Error al eliminar el empleado');
    }
};

  const getRoleName = (roleId: number) => {
    switch(roleId) {
      case 1: return 'Admin';
      case 2: return 'Chef';
      case 3: return 'Mesero';
      default: return 'Staff';
    }
  };

  if (loading) return <div className="loading">Cargando empleados...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container2" onClick={() => showActionsModal.show && handleCloseActionsModal()}>
      <div className="sidebar2"></div>
      <div className="logo">OrderX</div>
      
      <div className="menu">
        <div className="menu-item">
          <Link to="/dashboard" style={{textDecoration:'none'}}>
            <div className="menu-icon">
              <img src={dashboardIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }} />
            </div>
          </Link>
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
      
      <Link to="/login" style={{textDecoration:'none'}}>
        <div className="logout-icon">
          <img src={logoutIcon} alt=""/>
        </div>
      </Link>
      
      <div className="logout-container">Logout</div>
      
      <div className="page-title">Staff Management</div>
      <div className="back-button"></div>
      <div className="back-arrow">
        <img src={arrowIcon} alt=""/>
      </div>
      
      <div className="icon-3">
        <img src={notificationIcon} alt="" style={{ height: '40px'}} />
      </div>

      <Link to="/profile" style={{textDecoration:'none'}}>
        <img className="profile-pic" src={profileIcon} alt="Profile" />
      </Link>
      
      <div className="staff-title">Staff ({staffList.length})</div>
      
      <div className="add-staff-btn" onClick={handleAddStaffClick}>
        <div className="add-staff-text">Add Staff</div>
      </div>
      
      <div className="sort-by-btn">
        <div className="sort-by-text">Sort by</div>
        <div className="sort-arrow">
          <img src={arrowIcon} alt=""/>
        </div>
      </div>
      
      <div className="column-header" style={{left: '1095px', top: '278px'}}>Salary</div>
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
        {staffList.map((staff, i) => (
          <div 
            key={staff.id_employee} 
            className={`staff-row ${i % 2 === 0 ? 'staff-row-dark' : 'staff-row-light'}`}
            ref={el => setRowRef(el, i)}
          >
            <div className="staff-cell">${staff.salary}</div>
            <div className="staff-cell">{staff.email}</div>
            <div className="staff-cell">{staff.phone}</div>
            <div className="staff-cell">{staff.age} yr</div>
            <div className="staff-cell">#{staff.id_employee}</div>
            <div 
              className="staff-dots" 
              onClick={(e) => handleDotsClick(staff.id_employee.toString(), e, i)}
              ref={el => setDotsRef(el, i)}
            >
              <img src={Dots} alt="Actions" />
            </div>
            <div className="staff-info">
              <img className="staff-avatar" src={profileIcon} alt="Staff" />
              <div className="staff-details">
                <div className="staff-name">{staff.name}</div>
                <div className="staff-role">{getRoleName(staff.role_id)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showAddStaffModal && (
        <div className="modal-overlay">
          <div className="add-staff-modal">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <div className="modal-title">{isEditing ? 'Edit Staff' : 'Add Staff'}</div>
                <div className="modal-close" onClick={handleCloseModal}>
                  <img src={arrowIcon} alt="" style={{ marginLeft: '6px', marginTop: '6px' }}/>
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="form-input">
                    <input 
                      type="text" 
                      name="fullName"
                      placeholder="Enter full name" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <div className="form-input">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter email address" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Role</label>
                  <div className="form-input with-dropdown">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="1">Admin</option>
                      <option value="2">Chef</option>
                      <option value="3">Mesero</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Phone number</label>
                  <div className="form-input">
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Enter phone number" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Salary</label>
                  <div className="form-input">
                    <input 
                      type="number" 
                      name="salary"
                      placeholder="Enter Salary" 
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Age</label>
                  <div className="form-input">
                    <input 
                      type="number" 
                      name="age"
                      placeholder="Enter age" 
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="18"
                      max="99"
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-buttons">
                <button type="button" className="cancel-button" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="confirm-button">{isEditing ? 'Update' : 'Confirm'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showActionsModal.show && showActionsModal.position && (
        <div 
          className="actions-modal-overlay"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: `${showActionsModal.position.top}px`,
            left: `${showActionsModal.position.left - 180}px`,
            zIndex: 1001
          }}
        >
          <div className="actions-modal">
            <div className="actions-modal-content">
              <div className="action-item" onClick={() => showActionsModal.staffId && handleEditStaff(showActionsModal.staffId)}>
                <div className="action-text">Edit Staff</div>
              </div>
              <div className="action-item" onClick={() => showActionsModal.staffId && handleDeleteStaff(showActionsModal.staffId)}>
                <div className="action-text">Delete Staff</div>
              </div>
              <div className="action-item">
                <div className="action-text">Edit status</div>
              </div>
            </div>
            <div className="actions-modal-close" onClick={handleCloseActionsModal}>
              <div className="close-icon-small"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;