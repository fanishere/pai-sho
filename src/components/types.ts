export type Position = {
  x: number;
  y: number;
};

export type PieceData = {
  position: Position | null;
};

export type PieceGuide = {
  position: Position;
  offset: number;
};

export type Side = 'red' | 'white';
