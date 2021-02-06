import {
  MOVE_PIECE,
  PieceGuide,
  Position,
  REMOVE_GUIDES,
  SET_GUIDES
} from './types';
import { createAction } from '@reduxjs/toolkit';

export const movePiece = createAction(
  MOVE_PIECE,
  (pieceName: string, position: Position) => {
    return {
      payload: {
        type: MOVE_PIECE,
        pieceName: pieceName,
        position: position
      }
    };
  }
);

export const setGuides = createAction(SET_GUIDES, (guides: PieceGuide[]) => {
  return {
    payload: {
      type: SET_GUIDES,
      guides
    }
  };
});

export const removeGuides = createAction(REMOVE_GUIDES);
