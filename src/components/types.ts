export type Position = {
  x: number;
  y: number;
};

export type PieceData = {
  position: Position;
};

export interface PieceDataList {
  [index: string]: PieceData;
}

export type PieceGuideCandidates = {
  position: Position;
  offset: number;
};

export type PieceGuide = {
  position: Position;
  offset: number;
};

export type Side = 'red' | 'white';
