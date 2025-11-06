import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; 
// You'll need to create Sidebar.css

// You would typically use an icon library like react-icons
// For now, we'll use text placeholders
const DashboardIcon = () => <span>[D]</span>;
const InventoryIcon = () => <span>[I]</span>;
const OrdersIcon = () => <span>[O]</span>;
const CustomersIcon = () => <span>[C]</span>;
const AnalyticsIcon = () => <span>[A]</span>;
const InvoicesIcon = () => <span>[Inv]</span>;
const SettingsIcon = () => <span>[S]</span>;

function Sidebar() {
  return (
    <nav className="sidebar">
      <h1 className="sidebar-title">Navigation</h1>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/dashboard">
            <DashboardIcon /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory">
            <InventoryIcon /> Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            <OrdersIcon /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers">
            <CustomersIcon /> Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics">
            <AnalyticsIcon /> Analytics
          </NavLink>
        </li>
        <li>
          <NavLink to="/invoices">
            <InvoicesIcon /> Invoices
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <SettingsIcon /> Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;