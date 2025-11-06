import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css'; // Reusing the same styles

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [numGodowns, setNumGodowns] = useState(0);
  const [godownNames, setGodownNames] = useState([]);
  const [contactNo, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  }

  const handleNumGodownsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumGodowns(value);
    setGodownNames(Array.from({ length: value }, (_, i) => godownNames[i] || ''));
  };

  const handleGodownNameChange = (index, value) => {
    const newGodownNames = [...godownNames];
    newGodownNames[index] = value;
    setGodownNames(newGodownNames);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must be 8-16 characters long and contain at least one special character.');
      return;
    }
    if (!validatePhoneNumber(contactNo)) {
      setError('Contact number must be 10 digits.');
      return;
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      setError('Name should only contain alphabetic characters.');
      return;
    }
    // In a real app, you would register the user via an API call.
    // For now, we'll assume signup is successful and navigate to the login page.
    console.log({
      name,
      email,
      companyName,
      numGodowns,
      godownNames,
      contactNo,
      password,
    });
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form onSubmit={handleSignup}>
          <h2>Create an Account</h2>
          <p>Get started with your inventory management</p>

          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Your Name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company's Name</label>
            <input 
              type="text" 
              id="companyName" 
              placeholder="Your Company" 
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="numGodowns">Number of Godowns</label>
            <input 
              type="number" 
              id="numGodowns" 
              placeholder="e.g., 3" 
              required
              value={numGodowns}
              onChange={handleNumGodownsChange}
            />
          </div>

          {numGodowns > 0 &&
            Array.from({ length: numGodowns }).map((_, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={`godownName-${index}`}>Godown ${index + 1} Name</label>
                <input 
                  type="text" 
                  id={`godownName-${index}`} 
                  placeholder={`Godown ${index + 1} Name`} 
                  required
                  value={godownNames[index] || ''}
                  onChange={(e) => handleGodownNameChange(index, e.target.value)}
                />
              </div>
            ))}

          <div className="form-group">
            <label htmlFor="contactNo">Contact No</label>
            <input 
              type="tel" 
              id="contactNo" 
              placeholder="1234567890" 
              required
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
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