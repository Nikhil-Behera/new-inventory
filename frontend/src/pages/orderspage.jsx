import React, { useState, useEffect } from 'react';
import { mockOrders } from '../data/mockorder.js'; // Note: check your filename, you have 'mockorder.js'
import AddOrderModal from '../components/AddOrderModal';
import { FaEdit, FaTrash, FaFileInvoice } from 'react-icons/fa';
import './OrdersPage.css'; // We'll create this CSS file for action buttons
import { generateInvoicePdf } from '../utils/pdfGenerator.js';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);

  useEffect(() => {
    // Simulate API call
    setOrders(mockOrders);
  }, []);

  const handleOpenAddModal = () => {
    setOrderToEdit(null); // Clear any previous edit data
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (order) => {
    setOrderToEdit(order);
    setIsModalOpen(true);
  };

  const handleSaveOrder = (orderData) => {
    if (orderToEdit) {
      // Update existing order
      setOrders(orders.map(o => o.id === orderData.id ? orderData : o));
    } else {
      // Add new order
      setOrders(prevOrders => [orderData, ...prevOrders]);
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  const handleGenerateInvoice = (order) => {
    // For now, this just generates and downloads the PDF.
    // A future step could be to also add this to the Invoices page state.
    generateInvoicePdf(order);
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1>Orders & Delivery Challans</h1>
          <h2>Manage orders and generate delivery challans</h2>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          + New Order
        </button>
      </div>

      {isModalOpen && (
        <AddOrderModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveOrder}
          orderToEdit={orderToEdit}
        />
      )}

      <table className="app-table">
        <thead>
          <tr>
            <th>Challan ID</th>
            <th>Customer</th>
            <th>Delivery Date</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.challanId}</td>
              <td>{order.customer}</td>
              <td>{order.deliveryDate}</td>
              <td>{order.items}</td> {/* Display the actual items string */}
              <td>{order.status}</td>
              <td className="actions-cell">
                <button className="icon-btn" onClick={() => handleOpenEditModal(order)}>
                  <FaEdit />
                </button>
                <button className="icon-btn delete" onClick={() => handleDeleteOrder(order.id)}>
                  <FaTrash />
                </button>
                <button className="icon-btn" title="Generate Invoice" onClick={() => handleGenerateInvoice(order)}>
                  <FaFileInvoice />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;