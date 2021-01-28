import { GameActionTypes, MOVE_PIECE, Position } from './types';

export const movePiece = (
  pieceName: string,
  position: Position
): GameActionTypes => {
  return {
    type: MOVE_PIECE,
    pieceName: pieceName,
    position: position
  };
};
