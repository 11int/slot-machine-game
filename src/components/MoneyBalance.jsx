import React from 'react';
import './styles.css';

const MoneyBalance = ({ money }) => {
  return (
    <div className="money-box">
      <h4>Balance:</h4>
      <p>${money}</p>
    </div>
  );
};

export default MoneyBalance;
