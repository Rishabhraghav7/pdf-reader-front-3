import React from 'react';
import './search.css'; 

const Button = () => {
  return (
    <button className="button" data-text="Awesome">
      <span className="actual-text">&nbsp;Generate&nbsp;</span>
      <span aria-hidden="true" className="hover-text">&nbsp;Generate&nbsp;</span>
    </button>
  );
};

export default Button;
