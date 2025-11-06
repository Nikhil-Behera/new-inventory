import React, { useState, useEffect } from 'react';
import './AddOrderModal.css'; // We'll create this CSS file next
import { mockCustomers } from '../data/mockcust';
import { mockProducts } from '../data/mockproducts';

function AddOrderModal({ onClose, onSave, orderToEdit }) {
  const isEditMode = Boolean(orderToEdit);

  const [orderData, setOrderData] = useState({
    challanId: '',
    customer: '',
    deliveryDate: '',
    items: [], // Changed to an array
    status: 'Pending', // Default status
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isEditMode) {
      setOrderData(orderToEdit);
    } else {
      // Reset form for new order
      setOrderData({
        challanId: '',
        customer: '',
        deliveryDate: '',
        items: [],
        status: 'Pending',
      });
    }
  }, [orderToEdit, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerChange = (e) => {
    const { value } = e.target;
    // Allow only alphabetic characters for customer name
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setOrderData(prev => ({ ...prev, customer: value }));
      if (value) {
        const filteredSuggestions = mockCustomers.filter(c =>
          c.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setIsDropdownVisible(true);
      } else {
        setSuggestions([]);
        setIsDropdownVisible(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setOrderData(prev => ({ ...prev, customer: suggestion.name }));
    setSuggestions([]);
    setIsDropdownVisible(false);
  };

  const handleAddItem = () => {
    const product = mockProducts.find(p => p.id === selectedProduct);
    if (!product) {
      alert('Please select a product.');
      return;
    }

    if (quantity > product.quantity) {
      alert(`Insufficient stock for ${product.productName}. Available: ${product.quantity}`);
      return;
    }

    const newItem = {
      productId: product.id,
      productName: product.productName,
      quantity,
      price: product.price,
    };

    setOrderData(prev => ({ ...prev, items: [...prev.items, newItem] }));
    setSelectedProduct('');
    setQuantity(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderToSave = {
      ...orderData,
      id: isEditMode ? orderToEdit.id : `o${Date.now()}`,
      items: orderData.items.map(item => `${item.quantity} x ${item.productName}`).join(', '),
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
          {/* ... other form groups ... */}
          <div className="form-group">
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={orderData.customer}
              onChange={handleCustomerChange}
              required
              autoComplete="off"
            />
            {isDropdownVisible && suggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {suggestions.map(suggestion => (
                  <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* ... other form groups ... */}
          <div className="form-group">
            <label>Items</label>
            <div className="item-adder">
              <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                <option value="">Select a product</option>
                {mockProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.productName}</option>
                ))}
              </select>
              <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} min="1" />
              <button type="button" onClick={handleAddItem}>Add</button>
            </div>
            <ul className="added-items">
              {orderData.items.map((item, index) => (
                <li key={index}>{item.quantity} x {item.productName} @ ${item.price}</li>
              ))}
            </ul>
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