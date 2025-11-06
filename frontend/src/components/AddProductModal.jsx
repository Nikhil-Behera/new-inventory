import React, { useState, useEffect } from 'react';
import './AddProductModal.css';

function AddProductModal({ onClose, onSave, productToEdit }) {
  const isEditMode = Boolean(productToEdit);
  const godowns = ['Main Godown', 'Secondary Godown']; // Hardcoded for now

  // State to manage the form inputs
  const [newProduct, setNewProduct] = useState({
    productName: '', supplier: '', quantity: '', price: '', expiryDate: '', location: godowns[0],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      // If we are editing, pre-fill the form with the product's data
      setNewProduct(productToEdit);
    } else {
      // If adding, ensure the form is clear
      setNewProduct({ productName: '', supplier: '', quantity: '', price: '', expiryDate: '', location: godowns[0] });
    }
  }, [productToEdit, isEditMode]);

  const validateName = (name) => {
    return /^[a-zA-Z\s]*$/.test(name);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateName(newProduct.productName)) {
      setError('Product name should only contain alphabetic characters.');
      return;
    }
    if (!validateName(newProduct.supplier)) {
      setError('Supplier name should only contain alphabetic characters.');
      return;
    }
    // Create a new product object with a unique ID and correct data types
    const productData = {
      ...newProduct,
      id: isEditMode ? productToEdit.id : Date.now(), // Keep original ID if editing
      quantity: parseInt(newProduct.quantity, 10) || 0,
      price: parseFloat(newProduct.price) || 0,
    };
    onSave(productData); // Pass the new/updated product to the parent
    onClose(); // Close the modal
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input type="text" id="productName" name="productName" value={newProduct.productName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="supplier">Supplier</label>
            <input type="text" id="supplier" name="supplier" value={newProduct.supplier} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" value={newProduct.quantity} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" step="0.01" id="price" name="price" value={newProduct.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="date" id="expiryDate" name="expiryDate" value={newProduct.expiryDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="location">Godown</label>
            <select id="location" name="location" value={newProduct.location} onChange={handleChange} required>
              {godowns.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditMode ? 'Save Changes' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;