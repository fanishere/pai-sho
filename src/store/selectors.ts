import { createSelector } from '@reduxjs/toolkit';
import { GameState, PieceData, PieceGuide } from './types';

export const piecesSelector = (state: GameState): PieceData[] => {
  return state.piecePositions;
};

export const pieceMapSelector = createSelector(
  piecesSelector,
  (pieces) => new Map(pieces.map((piece) => [piece.name, piece.position]))
);

export const guidesSelector = (state: GameState): PieceGuide[] => {
  return state.guidesVisible;
};
