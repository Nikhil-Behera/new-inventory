import React from 'react';
import './SummaryCard.css';

function SummaryCard({ title, value, description, isAlert = false }) {
  return (
    <div className={`summary-card ${isAlert ? 'alert' : ''}`}>
      <div className="card-header">
        <span className="card-title">{title}</span>
        <span className="card-icon">[Icon]</span>
      </div>
      <h2 className="card-value">{value}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
}

export default SummaryCard;