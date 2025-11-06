import React, { useState, useEffect } from 'react';
import { mockCustomers } from '../data/mockcust.js'; // Check your filename, you have 'mockcust.js'
import AddCustomerModal from '../components/AddCustomerModal';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  useEffect(() => {
    // Simulate API call
    setCustomers(mockCustomers);
  }, []);

  const handleSaveCustomer = (customerData) => {
    setCustomers(prevCustomers => {
      const existingIndex = prevCustomers.findIndex(c => c.id === customerData.id);
      if (existingIndex > -1) {
        // Update existing customer
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[existingIndex] = customerData;
        return updatedCustomers;
      } else {
        // Add new customer
        return [...prevCustomers, customerData];
      }
    });
    setIsModalOpen(false);
    setCustomerToEdit(null);
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <h2>Manage your customer records</h2>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { setCustomerToEdit(null); setIsModalOpen(true); }}
        >
          + Add Customer
        </button>
      </div>

      <table className="app-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>GST Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.contact}</td>
              <td>{customer.address}</td>
              <td>{customer.gstNumber}</td>
              <td className="actions-cell">
                <button className="icon-btn" onClick={() => { setCustomerToEdit(customer); setIsModalOpen(true); }}>
                  ✏️
                </button>
                <button className="icon-btn delete">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AddCustomerModal 
          onClose={() => { setIsModalOpen(false); setCustomerToEdit(null); }}
          onSave={handleSaveCustomer}
          customerToEdit={customerToEdit}
        />
      )}
    </div>
  );
}

export default CustomersPage;