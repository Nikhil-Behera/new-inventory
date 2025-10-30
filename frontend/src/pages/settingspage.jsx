import React from 'react';
import "./settingspage.css"; // We'll create this new CSS file

function SettingsPage() {
  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Profile Settings</h1>
          <h2>Manage your account settings and preferences</h2>
        </div>
      </div>

      <div className="settings-container">
        {/* Personal Information Card */}
        <div className="settings-card">
          <h3>Personal Information</h3>
          <p>Update your personal details</p>
          <form>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" defaultValue="123" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" defaultValue="1@1" />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input type="text" id="contact" defaultValue="234567890" />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="settings-card">
          <h3>Change Password</h3>
          <p>Update your account password</p>
          <form>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input type="password" id="confirmPassword" />
            </div>
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;