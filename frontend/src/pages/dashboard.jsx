import React from 'react';
import SummaryCard from '../components/SummaryCard';
import './Dashboard.css';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <h2>Overview of your inventory management system</h2>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <SummaryCard 
          title="Total Products" 
          value="2" 
          description="1 items low on stock" 
        />
        <SummaryCard 
          title="Total Orders" 
          value="1" 
          description="Delivery challans created" 
        />
        <SummaryCard 
          title="Total Customers" 
          value="2" 
          description="Active customers" 
        />
        <SummaryCard 
          title="Critical Alerts" 
          value="1" 
          description="Requires immediate attention" 
          isAlert
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