import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css'; // Reusing the same styles
import zxcvbn from 'zxcvbn';

function SignupPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const strength = zxcvbn(password);
  const strengthScore = password.length > 0 ? strength.score + 1 : 0;

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, you would register the user via an API call.
    // For now, we'll assume signup is successful and navigate to the login page.
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form onSubmit={handleSignup}>
          <h2>Create an Account</h2>
          <p>Get started with your inventory management</p>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length > 0 && (
              <div className="password-strength-meter">
                <div 
                  className="strength-bar" 
                  style={{ width: `${strengthScore * 20}%` }}
                  data-strength={strengthScore}
                ></div>
              </div>
            )}
            <p className="form-hint">
              {password.length > 0 
                ? `Strength: ${strength.feedback.warning || 'Good'}` 
                : 'Use a mix of letters, numbers, and symbols.'}
            </p>
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Sign Up
          </button>
          
          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;