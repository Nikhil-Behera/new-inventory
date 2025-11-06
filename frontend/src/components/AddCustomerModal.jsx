import React, { useState, useEffect } from 'react';
import './AddOrderModal.css'; // Reusing the same modal styles for consistency

function AddCustomerModal({ onClose, onSave, customerToEdit }) {
  const isEditMode = Boolean(customerToEdit);

  const [customerData, setCustomerData] = useState({
    name: '',
    contact: '',
    address: '',
    gstNumber: '',
  });

  useEffect(() => {
    if (isEditMode) {
      setCustomerData(customerToEdit);
    } else {
      // Reset form for new customer
      setCustomerData({
        name: '',
        contact: '',
        address: '',
        gstNumber: '',
      });
    }
  }, [customerToEdit, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      // Allow only alphabetic characters for name
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setCustomerData(prev => ({ ...prev, [name]: value }));
      }
    } else if (name === 'contact') {
      // Allow only 10-digit numbers for contact
      if (/^\d{0,10}$/.test(value)) {
        setCustomerData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setCustomerData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerToSave = {
      ...customerData,
      id: isEditMode ? customerToEdit.id : `c${Date.now()}`, // Generate unique ID for new customers
    };
    onSave(customerToSave);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Customer' : 'Add New Customer'}</h2>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={customerData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" name="contact" value={customerData.contact} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={customerData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="gstNumber">GST Number</label>
            <input type="text" id="gstNumber" name="gstNumber" value={customerData.gstNumber} onChange={handleChange} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditMode ? 'Save Changes' : 'Add Customer'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerModal;