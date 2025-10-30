import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './navbar';
 
function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
 
export default Layout;