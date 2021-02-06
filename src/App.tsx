import React, { FunctionComponent } from 'react';
import './App.css';
import Game from './components/Game';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Game height={300} width={300} radius={300} gridCount={18}></Game>
    </div>
  );
};
export default App;
