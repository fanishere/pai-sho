export interface Position {
  x: number;
  y: number;
}

export interface PieceData {
  name: string;
  position: Position | null;
}

export interface GameState {
  piecePositions: PieceData[];
}

export const MOVE_PIECE = 'PIECE_MOVE';

interface PieceMoveAction {
  type: typeof MOVE_PIECE;
  pieceName: string;
  position: Position;
}

export type GameActionTypes = PieceMoveAction;
