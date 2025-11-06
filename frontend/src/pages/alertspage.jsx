import React, { useState, useEffect } from 'react';
import { mockAlerts } from '../data/mockalerts.js';
import './Alerts.css';

function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setAlerts(mockAlerts);
  }, []);

  const handleMarkAsRead = (alertId) => {
    setAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert.id !== alertId)
    );
  };

  const handleMarkAllAsRead = () => {
    setAlerts([]);
  };

  return (
    <div className="alerts-page">
      <div className="page-header">
        <div>
          <h1>Alerts & Notifications</h1>
          <h2>System alerts and important notifications</h2>
        </div>
        <div>
          <button
            className="btn-mark-all"
            onClick={handleMarkAllAsRead}
            disabled={alerts.length === 0}
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="alerts-list">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className="alert-card">
              <div className="alert-icon">
                <span
                  role="img"
                  aria-label={alert.level === 'HIGH' ? 'Warning' : 'Information'}
                >
                  {alert.level === 'HIGH' ? '⚠️' : 'ℹ️'}
                </span>
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
                <button
                  className="btn-mark-as-read"
                  onClick={() => handleMarkAsRead(alert.id)}
                >
                  Mark as Read
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-alerts-message">No new alerts or notifications.</p>
        )}
      </div>
    </div>
  );
}

export default AlertsPage;