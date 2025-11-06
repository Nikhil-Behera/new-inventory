import React from 'react';
import SummaryCard from '../components/SummaryCard';
import './Dashboard.css';
import { mockProducts } from '../data/mockproducts';
import { mockOrders } from '../data/mockorder';
import { mockCustomers } from '../data/mockcust';

function DashboardPage() {
  const userName = "John Doe"; // Hardcoded for now
  const companyName = "Doe Inc."; // Hardcoded for now

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Welcome, {userName}</h1>
          <h2>{companyName}</h2>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <SummaryCard 
          title="Total Products" 
          value={mockProducts.length} 
          description={`${mockProducts.filter(p => p.quantity < 10).length} items low on stock`} 
          to="/inventory"
        />
        <SummaryCard 
          title="Total Orders" 
          value={mockOrders.length} 
          description="Delivery challans created" 
          to="/orders"
        />
        <SummaryCard 
          title="Total Customers" 
          value={mockCustomers.length} 
          description="Active customers" 
          to="/customers"
        />
        <SummaryCard 
          title="Critical Alerts" 
          value="1" 
          description="Requires immediate attention" 
          isAlert
          to="/alerts"
        />
      </div>

      <div className="dashboard-success-toast">
        <strong>Success</strong>
        <p>2FA verification successful</p>
      </div>
    </div>
  );
}

export default DashboardPage;