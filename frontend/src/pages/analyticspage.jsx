import React from 'react';
import SummaryCard from '../components/summarycard.jsx'; // Make sure this path is correct!
import "./analyticspage.css"; // We'll create this new CSS file

function AnalyticsPage() {
  // Mock data for this page
  const topSellers = [
    { id: 'p2', name: 'biscuit', sold: 3 },
    { id: 'p1', name: 'lays', sold: 1 },
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics & Reports</h1>
          <h2>Business insights and performance metrics</h2>
        </div>
      </div>

      <div className="analytics-grid">
        <SummaryCard 
          title="Total Revenue" 
          value="$0.00" 
          description="From all invoices" 
        />
        <SummaryCard 
          title="Total Orders" 
          value="1" 
          description="Delivery challans" 
        />
        <SummaryCard 
          title="Low Stock Items" 
          value="1" 
          description="Below 10 units" 
        />
        <SummaryCard 
          title="Expiring Soon" 
          value="1" 
          description="Within 30 days" 
        />
      </div>

      <div className="top-selling-card">
        <h3>Top Selling Products</h3>
        <p>Products with highest order quantities</p>
        <ol className="top-selling-list">
          {topSellers.map((product) => (
            <li key={product.id}>
              <span>{product.name}</span>
              <span>{product.sold} units sold</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default AnalyticsPage;