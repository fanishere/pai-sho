export interface Position {
  x: number;
  y: number;
}

export interface PieceData {
  name: string;
  position: Position | null;
}

export type PieceGuide = {
  position: Position;
  offset: number;
};

export interface GameState {
  piecePositions: PieceData[];
  guidesVisible: PieceGuide[];
}

export const MOVE_PIECE = 'MOVE_PIECE';
export const SET_GUIDES = 'SET_GUIDES';
export const REMOVE_GUIDES = 'REMOVE_GUIDES';

export interface PieceMoveAction {
  type: typeof MOVE_PIECE;
  pieceName: string;
  position: Position;
}

export interface SetGuidesAction {
  type: typeof SET_GUIDES;
  guides: PieceGuide[];
}

export interface RemoveGuidesAction {
  type: typeof REMOVE_GUIDES;
}

export type GameActionTypes =
  | PieceMoveAction
  | SetGuidesAction
  | RemoveGuidesAction;
