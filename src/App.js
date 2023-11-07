import React, { useState } from 'react';
import Game from './components/Game';
import MoneyBalance from './components/MoneyBalance';
import './styles.css';

function App() {
  const [money, setMoney] = useState(0);

  return (
    <div className="App">
      <MoneyBalance money={money} />
      <Game setMoney={setMoney} />
    </div>
  );
}

export default App;
