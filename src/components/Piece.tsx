import React from 'react';
import lily from '../assets/Lily_final.svg';
import { Image } from 'react-konva';
import { debounce } from 'underscore';
import Konva from 'konva';
import { PieceGuide, PieceGuideCandidates, Position, PieceData } from './types';

type PieceProps = {
  position: Position;
  name: string;
  gridWidth: number;
  onDragMove: (p: Piece) => void;
  onDragEnd: (p: Piece) => void;
};

export class Piece extends React.Component<PieceProps, PieceData> {
  readonly imageRef: React.RefObject<Konva.Image>;
  constructor(props: PieceProps) {
    super(props);

    this.imageRef = React.createRef();
    this.handleChange = debounce(this.handleChange.bind(this), 25, true);
    this.handleMove = this.handleMove.bind(this);
    this.state = {
      position: this.props.position
    };
  }

  // TODO name the positions ex: top left 0
  getSnapLines = (): Position[] => {
    const lines: Position[] = [];
    const vertical = [
      this.props.position.x - this.props.gridWidth,
      this.props.position.x,
      this.props.position.x + this.props.gridWidth
    ];
    const horizontal = [
      this.props.position.y - this.props.gridWidth,
      this.props.position.y,
      this.props.position.y + this.props.gridWidth
    ];
    vertical.map((v) => {
      horizontal.map((h) => {
        lines.push({
          x: v,
          y: h
        });
      });
    });

    return lines;
  };

  getGuides = (): PieceGuide[] => {
    const GUIDELINE_OFFSET = 100;
    const candidates: PieceGuideCandidates[] = [];
    const offset = 15;

    const snapPositions = this.getSnapLines();
    snapPositions.forEach((pos) => {
      if (this.imageRef.current) {
        const currentPosition = this.imageRef.current.getPosition();
        const xDiff = Math.abs(pos.x - currentPosition.x);
        const yDiff = Math.abs(pos.y - currentPosition.y);

        // if the distance between guild line and
        // object snap point is close we can consider this for snapping
        if (xDiff < GUIDELINE_OFFSET && yDiff < GUIDELINE_OFFSET) {
          candidates.push({
            position: pos,
            xDiff: xDiff,
            yDiff: yDiff,
            offset: offset
          });
        }
      }
    });

    const guides: PieceGuide[] = [];

    // sort guides
    candidates
      .sort((a, b) => {
        if (a.xDiff === b.xDiff) {
          return a.yDiff - b.yDiff;
        }
        return a.xDiff - b.xDiff;
      })
      .forEach((pos) => {
        guides.push({
          position: pos.position,
          offset: Math.max(pos.xDiff, pos.yDiff)
        });
      });

    return guides;
  };
  handleChange = (): void => {
    this.props.onDragMove(this);
  };
  handleMove = (): void => {
    this.props.onDragEnd(this);

    if (this.imageRef.current) {
      this.imageRef.current.setPosition(this.props.position);
    }
  };

  render(): React.ReactNode {
    const img = document.createElement('img');
    img.src = lily;

    return (
      <Image
        ref={this.imageRef}
        offset={{ x: 15, y: 15 }}
        onDragMove={this.handleChange}
        onDragEnd={this.handleMove}
        x={this.state.position.x}
        y={this.state.position.y}
        image={img}
        width={30}
        height={30}
        draggable={true}
      />
    );
  }
}
