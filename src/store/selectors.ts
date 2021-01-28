import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

const piecesSelector = (state: RootState) => state.pieces;

export const pieceMapSelector = createSelector(
  piecesSelector,
  (pieces) =>
    new Map(pieces.piecePositions.map((piece) => [piece.name, piece.position]))
);
