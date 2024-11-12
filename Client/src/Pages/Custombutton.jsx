// src/CustomButton.jsx
import React from 'react';
import './CustomButton.css'; // Ensure you create a CSS file for styling

const CustomButton = ({ text, onClick }) => {
  return (
    <div className="button-wrapper">
      <button className="button" data-text={text} onClick={onClick}>
        <span className="actual-text">&nbsp;{Upload}&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;{Upload}&nbsp;</span>
      </button>
    </div>
  );
};

export default CustomButton;
