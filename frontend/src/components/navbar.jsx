import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Import icons from react-icons

// Removed placeholder icon components
// const BellIcon = () => <span>[Bell]</span>;
// const UserIcon = () => <span>[User]</span>;
function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    // Navigate to login after state is updated
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-right">
        <Link to="/alerts" className="navbar-icon-btn">
          <FaBell /> {/* Replaced with actual Bell icon */}
          <span className="navbar-badge">2</span>
        </Link>
        <div className="navbar-profile">
          <button 
            className="navbar-icon-btn" 
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <FaUserCircle /> {/* Replaced with actual User icon */}
          </button>

          {profileOpen && (
            <div className="navbar-dropdown">
              <div className="dropdown-header">
                <strong>123</strong>
                <span>1@1</span>
              </div>
              <Link to="/settings" onClick={() => setProfileOpen(false)}>
                Profile Settings
              </Link>
              <button onClick={handleLogout} className="dropdown-logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;