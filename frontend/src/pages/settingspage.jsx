import React, { useState } from 'react';
import './settingspage.css';

function SettingsPage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [companyName, setCompanyName] = useState('Doe Inc.');
  const [numGodowns, setNumGodowns] = useState(2);
  const [godownNames, setGodownNames] = useState(['Main Godown', 'Secondary Godown']);
  const [contactNo, setContactNo] = useState('1234567890');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleUpdate = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
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

    // In a real app, you would make an API call to update the user's profile.
    console.log('Updated profile:', {
      name,
      email,
      companyName,
      numGodowns,
      godownNames,
      contactNo,
      password: password ? '********' : 'unchanged',
    });

    setSuccess('Profile updated successfully!');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleUpdate} className="settings-form">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company's Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numGodowns">Number of Godowns</label>
          <input
            type="number"
            id="numGodowns"
            value={numGodowns}
            onChange={handleNumGodownsChange}
            required
          />
        </div>

        {numGodowns > 0 &&
          Array.from({ length: numGodowns }).map((_, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={`godownName-${index}`}>{`Godown ${index + 1} Name`}</label>
              <input
                type="text"
                id={`godownName-${index}`}
                value={godownNames[index] || ''}
                onChange={(e) => handleGodownNameChange(index, e.target.value)}
                required
              />
            </div>
        ))}

        <div className="form-group">
          <label htmlFor="contactNo">Contact No</label>
          <input
            type="tel"
            id="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;
