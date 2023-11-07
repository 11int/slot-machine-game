import React from 'react';
import './styles.css';

const EarnMoney = ({ money, earnMoney }) => {
  return (
    <div className="earn-money">
      <button onClick={earnMoney}>Tjen penger</button>
    </div>
  );
};

export default EarnMoney;