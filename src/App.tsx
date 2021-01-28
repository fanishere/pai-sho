import React from 'react';
import './App.css';
import Game from './components/Game';
import { useDispatch, useSelector } from 'react-redux';
import { movePiece } from './store/actions';
import { pieceMapSelector } from './store/selectors';

function App(): JSX.Element {
  const dispatch = useDispatch();
  dispatch(movePiece('rose', { x: 1.5, y: 1.5 }));
  const pieces = useSelector(pieceMapSelector);
  console.log(pieces);
  return (
    <div className="App">
      <Game height={300} width={300} radius={300} gridCount={18}></Game>
    </div>
  );
}

export default App;
