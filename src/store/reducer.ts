import { GameState } from './types';
import { createReducer } from '@reduxjs/toolkit';
import { movePiece, removeGuides, setGuides } from './actions';

const initialGameState: GameState = {
  piecePositions: [
    { name: 'rose', position: null },
    { name: 'second', position: null }
  ],
  guidesVisible: []
};

export const piecesReducer = createReducer(initialGameState, (builder) => {
  builder
    .addCase(movePiece, (state, action) => {
      return {
        ...state,
        piecePositions: state.piecePositions.map((piece) => {
          if (piece.name != action.payload.pieceName) {
            return piece;
          }
          return {
            ...piece,
            position: action.payload.position
          };
        })
      };
    })
    .addCase(setGuides, (state: GameState, action) => {
      return {
        ...state,
        guidesVisible: action.payload.guides
      };
    })
    .addCase(removeGuides, (state) => {
      return {
        ...state,
        guidesVisible: []
      };
    });
});
