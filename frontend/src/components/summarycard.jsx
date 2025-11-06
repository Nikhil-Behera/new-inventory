import React from 'react';
import './SummaryCard.css';

function SummaryCard({ title, value, description, isAlert = false, onClick, isClickable = false }) {
  const cardClassName = `summary-card ${isAlert ? 'alert' : ''} ${isClickable ? 'clickable' : ''}`;

  return (
    <div 
      className={cardClassName}
      onClick={onClick}
    >
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