import React, { useState, useEffect } from 'react';
import { mockAlerts } from '../data/mockalerts.js'; // Check your filename, you have 'mockalerts.js'
import './Alerts.css'; // We'll create this new CSS file

function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate API call
    setAlerts(mockAlerts);
  }, []);

  return (
    <div className="alerts-page">
      <div className="page-header">
        <div>
          <h1>Alerts & Notifications</h1>
          <h2>System alerts and important notifications</h2>
        </div>
      </div>

      <div className="alerts-list">
        {alerts.map((alert) => (
          <div key={alert.id} className="alert-card">
            <div className="alert-icon">
              {/* You can add an icon here based on alert.level */}
              {alert.level === 'HIGH' ? '⚠️' : 'ℹ️'}
            </div>
            <div className="alert-content">
              <h4>{alert.type}</h4>
              <p>{alert.message}</p>
              <span className="alert-timestamp">{alert.timestamp}</span>
            </div>
            <div className="alert-actions">
              <span className={`alert-priority ${alert.level.toLowerCase()}`}>
                {alert.level}
              </span>
              <button className="btn-mark-as-read">Mark as Read</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsPage;