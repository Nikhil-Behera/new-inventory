import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css'; // It reuses the same styles

function TwoFactorPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleVerify = (e) => {
    e.preventDefault();
    // In a real app, you'd verify the code.
    // For now, we set the user as logged in and navigate to the dashboard.
    login();
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form onSubmit={handleVerify}>
          <div className="auth-header-icon">[Shield]</div>
          <h2>Two-Factor Authentication</h2>
          <p>Enter the 6-digit code to complete your login</p>

          <div className="form-group">
            <label htmlFor="code">Verification Code</label>
            <input 
              type="text" 
              id="code" 
              placeholder="000000" 
            />
            <p className="form-hint">For testing: Enter any 6-digit code</p>
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default TwoFactorPage;