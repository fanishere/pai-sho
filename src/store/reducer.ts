import { GameActionTypes, GameState, MOVE_PIECE } from './types';

const initialGameState: GameState = {
  piecePositions: [
    { name: 'rose', position: null },
    { name: 'second', position: null }
  ]
};

export const piecesReducer = (
  state = initialGameState,
  action: GameActionTypes
) => {
  switch (action.type) {
    case MOVE_PIECE: {
      return {
        ...state,
        piecePositions: state.piecePositions.map((piece) => {
          if (piece.name != action.pieceName) {
            return piece;
          }
          return {
            ...piece,
            position: action.position
          };
        })
      };
    }
    default:
      return state;
  }
};
