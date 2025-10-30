import React, { useState, useEffect } from 'react';
import { mockCustomers } from '../data/mockcust.js'; // Check your filename, you have 'mockcust.js'

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Simulate API call
    setCustomers(mockCustomers);
  }, []);

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <h2>Manage your customer records</h2>
        </div>
        <button className="btn btn-primary">+ Add Customer</button>
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
              <td>
                <button>[Edit]</button>
                <button>[Delete]</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersPage;