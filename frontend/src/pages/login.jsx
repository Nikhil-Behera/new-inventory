import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css'; // We'll create this CSS file next

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you'd call your API here.
    // For now, we'll just pretend login is successful
    // and go to the 2FA page.
    navigate('/verify-2fa');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form onSubmit={handleLogin}>
          <h2>Sign In</h2>
          <p>Enter your credentials to access the system</p>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              defaultValue="1@1" // Pre-filled from your screenshot
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              defaultValue="123" // Just for testing
            />
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Sign In
          </button>
          
          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;