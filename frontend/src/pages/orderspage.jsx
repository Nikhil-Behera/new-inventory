import React, { useState, useEffect, useMemo } from 'react';
import { mockOrders } from '../data/mockorder.js'; // Note: check your filename, you have 'mockorder.js'
import AddOrderModal from '../components/AddOrderModal';
import { FaEdit, FaTrash, FaFileInvoice, FaCheck } from 'react-icons/fa';
import './OrdersPage.css'; // We'll create this CSS file for action buttons
import { generateInvoicePdf } from '../utils/pdfGenerator.js';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
      const newOrder = {
        ...orderData,
        challanId: `CH${Date.now()}`,
      };
      setOrders(prevOrders => [newOrder, ...prevOrders]);
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

  const handleCompleteOrder = (order) => {
    setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Completed' } : o));
    generateInvoicePdf(order);
  };

  const sortedAndFilteredOrders = useMemo(() => {
    let filteredOrders = orders.filter(order =>
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.challanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryDate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortConfig.key) {
      filteredOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredOrders;
  }, [orders, searchQuery, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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

      <div className="filters">
        <input
          type="text"
          placeholder="Search by customer, challan ID, or delivery date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
            <th onClick={() => requestSort('challanId')}>Challan ID</th>
            <th onClick={() => requestSort('customer')}>Customer</th>
            <th onClick={() => requestSort('deliveryDate')}>Delivery Date</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredOrders.map((order) => (
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
                <button className="icon-btn" title="Generate Challan" onClick={() => handleGenerateInvoice(order)}>
                  <FaFileInvoice />
                </button>
                {order.status !== 'Completed' && (
                  <button className="icon-btn" title="Mark as Completed" onClick={() => handleCompleteOrder(order)}>
                    <FaCheck />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;