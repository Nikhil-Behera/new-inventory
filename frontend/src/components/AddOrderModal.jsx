import React, { useState, useEffect } from 'react';
import './AddOrderModal.css'; // We'll create this CSS file next

function AddOrderModal({ onClose, onSave, orderToEdit }) {
  const isEditMode = Boolean(orderToEdit);

  const [orderData, setOrderData] = useState({
    challanId: '',
    customer: '',
    deliveryDate: '',
    items: '', // This will be a string for now, e.g., "3 items" or "Laptop, Mouse"
    status: 'Pending', // Default status
  });

  useEffect(() => {
    if (isEditMode) {
      setOrderData(orderToEdit);
    } else {
      // Reset form for new order
      setOrderData({
        challanId: '',
        customer: '',
        deliveryDate: '',
        items: '',
        status: 'Pending',
      });
    }
  }, [orderToEdit, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderToSave = {
      ...orderData,
      id: isEditMode ? orderToEdit.id : `o${Date.now()}`, // Generate unique ID for new orders
    };
    onSave(orderToSave);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Order' : 'Create New Order'}</h2>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="challanId">Challan ID</label>
            <input type="text" id="challanId" name="challanId" value={orderData.challanId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="customer">Customer</label>
            <input type="text" id="customer" name="customer" value={orderData.customer} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryDate">Delivery Date</label>
            <input type="date" id="deliveryDate" name="deliveryDate" value={orderData.deliveryDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="items">Items Description</label>
            <input type="text" id="items" name="items" value={orderData.items} onChange={handleChange} placeholder="e.g., 3 Lays, 2 Biscuits" required />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={orderData.status} onChange={handleChange} required>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditMode ? 'Save Changes' : 'Create Order'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrderModal;