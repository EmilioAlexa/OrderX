import React, { useState, useRef, useCallback } from 'react';
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

import { Link } from 'react-router-dom';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  age: string;
  salary: string;
  timings: string;
  image?: string;
}

const StaffManagement: React.FC = () => {
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([
    {
      id: '#101',
      name: 'Watson Joyce',
      role: 'Manager',
      email: 'watsonjoyce112@gmail.com',
      phone: '+1 (123) 123 4654',
      age: '45 yr',
      salary: '$2200.00',
      timings: '9am to 6pm',
      image: profileIcon
    },
  ]);
  const [showActionsModal, setShowActionsModal] = useState<{
    show: boolean;
    staffId: string | null;
    position: { top: number; left: number } | null;
  }>({ show: false, staffId: null, position: null });
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaffId, setCurrentStaffId] = useState<string | null>(null);

  // Función para manejar las referencias de las filas
  const setRowRef = useCallback((el: HTMLDivElement | null, index: number) => {
    rowRefs.current[index] = el;
  }, []);

  // Función para manejar las referencias de los botones de puntos
  const setDotsRef = useCallback((el: HTMLDivElement | null, index: number) => {
    dotsRefs.current[index] = el;
  }, []);

  // Estado para el formulario
// En el estado del formulario, cambia dob por age:
const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  role: '',
  phone: '',
  salary: '',
  age: '', // Cambiado de dob a age
  startTime: '',
  endTime: '',
  address: '',
  details: ''
});

  const handleAddStaffClick = () => {
    setIsEditing(false);
    setCurrentStaffId(null);
    setShowAddStaffModal(true);
  };

  const handleCloseModal = () => {
    setShowAddStaffModal(false);
    setProfileImage(null);
    setFormData({
      fullName: '',
      email: '',
      role: '',
      phone: '',
      salary: '',
      age: '',
      startTime: '',
      endTime: '',
      address: '',
      details: ''
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentStaffId) {
      // Editar staff existente
      setStaffList(staffList.map(staff => 
        staff.id === currentStaffId ? {
          ...staff,
          name: formData.fullName,
          role: formData.role || 'Staff',
          email: formData.email,
          phone: formData.phone,
          age: formData.age ? `${formData.age} yr` : 'N/A', // Usamos el valor directo
          salary: formData.salary ? `$${formData.salary}` : '$0.00',
          timings: `${formData.startTime || 'N/A'} to ${formData.endTime || 'N/A'}`,
          image: profileImage || staff.image
        } : staff
      ));
    } else {
      // Agregar nuevo staff
      const newStaff: StaffMember = {
        id: `#${Math.floor(100 + Math.random() * 900)}`,
        name: formData.fullName,
        role: formData.role || 'Staff',
        email: formData.email,
        phone: formData.phone,
        age: formData.age ? `${formData.age} yr` : 'N/A', // Usamos el valor directo
        salary: formData.salary ? `$${formData.salary}` : '$0.00',
        timings: `${formData.startTime || 'N/A'} to ${formData.endTime || 'N/A'}`,
        image: profileImage || profileIcon
      };
  
      setStaffList([...staffList, newStaff]);
    }
    
    handleCloseModal();
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
    const staffToEdit = staffList.find(staff => staff.id === staffId);
    if (staffToEdit) {
      setIsEditing(true);
      setCurrentStaffId(staffId);
      setProfileImage(staffToEdit.image || null);
      
      // Extraer la edad numérica (elimina " yr")
      const age = staffToEdit.age.replace(' yr', '');
      
      const [startTime, endTime] = staffToEdit.timings.split(' to ');
      
      setFormData({
        fullName: staffToEdit.name,
        email: staffToEdit.email,
        role: staffToEdit.role,
        phone: staffToEdit.phone,
        salary: staffToEdit.salary.replace('$', ''),
        age, // Usamos la edad directamente
        startTime,
        endTime,
        address: '',
        details: ''
      });
      
      setShowAddStaffModal(true);
    }
    handleCloseActionsModal();
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaffList(staffList.filter(staff => staff.id !== staffId));
    handleCloseActionsModal();
  };

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
            key={i} 
            ref={el => setRowRef(el, i)}
            className={`staff-row ${i % 2 === 0 ? 'staff-row-dark' : 'staff-row-light'}`}
            data-staff-id={staff.id}
          >
            <div className="staff-cell" style={{left: '906px', top: '19px'}}>{staff.salary}</div>
            
            <div className="staff-cell" style={{left: '384px', top: '19px'}}>{staff.email}</div>
            <div className="staff-cell" style={{left: '662px', top: '19px'}}>{staff.phone}</div>
            <div className="staff-cell" style={{left: '838px', top: '19px'}}>{staff.age}</div>
            <div className="staff-cell" style={{left: '56px', top: '19px'}}>{staff.id}</div>
            <div 
              ref={el => setDotsRef(el, i)}
              className="staff-dots" 
              style={{left: '1170px', top: '19px'}}
              onClick={(e) => handleDotsClick(staff.id, e, i)}
            >
              <img src={Dots} alt="Actions"/>
            </div>
            
            <div className="staff-info" style={{left: '116px', top: '10px'}}>
              <img className="staff-avatar" src={staff.image || profileIcon} alt="Staff" />
              <div className="staff-details">
                <div className="staff-name">{staff.name}</div>
                <div className="staff-role">{staff.role}</div>
              </div>
            </div>
            
            <div className="checkbox" style={{left: '25px', top: '24px'}}></div>
          </div>
        ))}
      </div>
      
      {/* Modal para Add/Edit Staff */}
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
              
              <div className="profile-picture-section">
                <div className="profile-image-container">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile Preview" 
                      className="profile-preview" 
                    />
                  ) : (
                    <div className="profile-placeholder">
                      <span>No image selected</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <div 
                  className="change-picture-link" 
                  onClick={triggerFileInput}
                >
                  {profileImage ? 'Change Profile Picture' : 'Select Profile Picture'}
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
                    <input 
                      type="text" 
                      name="role"
                      placeholder="Select role" 
                      value={formData.role}
                      onChange={handleInputChange}
                    />
                    <div className="dropdown-icon"></div>
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
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Salary</label>
                  <div className="form-input">
                    <input 
                      type="text" 
                      name="salary"
                      placeholder="Enter Salary" 
                      value={formData.salary}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
               {/* Reemplaza el campo de fecha de nacimiento por este campo de edad */}
<div className="form-group">
  <label>Age</label>
  <div className="form-input">
    <input 
      type="number" 
      name="age"
      placeholder="Enter age" 
      value={formData.age}
      onChange={handleInputChange}
      min="1"
      max="99"
    />
  </div>
</div>
                
                

                
                <div className="form-group full-width">
                  <label>Address</label>
                  <div className="form-input">
                    <input 
                      type="text" 
                      name="address"
                      placeholder="Enter address" 
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label>Additional details</label>
                  <div className="form-textarea">
                    <textarea 
                      name="details"
                      placeholder="Enter additional details"
                      value={formData.details}
                      onChange={handleInputChange}
                    ></textarea>
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
      
      {/* Modal de acciones (dots) */}
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