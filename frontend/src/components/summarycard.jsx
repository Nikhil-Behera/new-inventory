import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SummaryCard.css';

function SummaryCard({ title, value, description, isAlert = false, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div 
      className={`summary-card ${isAlert ? 'alert' : ''} ${to ? 'clickable' : ''}`}
      onClick={handleClick}
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