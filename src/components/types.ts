export type Position = {
    x: number;
    y: number;
}

export type PieceGuideCandidates = {
    position: Position;
    xDiff: number;
    yDiff: number;
    offset: number;
}

export type PieceGuide = {
    position: Position;
    offset: number;
}
