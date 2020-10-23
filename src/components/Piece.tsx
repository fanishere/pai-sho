import React from 'react';
import lily from '../assets/Lily_final.svg';
import { Image } from 'react-konva';
import { debounce } from 'underscore';
import Konva from 'konva';
import { PieceGuide, PieceGuideCandidates, Position, PieceData } from './types';

export interface PieceProps {
  position: Position;
  name: string;
  gridWidth: number;
  onDragMove: (p: Piece<PieceProps>) => void;
  onDragEnd: (p: Piece<PieceProps>) => void;
}

interface PieceInt {
  getSnapLines: () => Position[];
}

export class Piece<T extends PieceProps>
  extends React.Component<T, PieceData>
  implements PieceInt {
  readonly imageRef: React.RefObject<Konva.Image>;
  constructor(props: T) {
    super(props);

    this.imageRef = React.createRef();
    this.handleChange = debounce(this.handleChange.bind(this), 25, true);
    this.handleMove = this.handleMove.bind(this);
    this.state = {
      position: this.props.position
    };
  }
  
  getSnapLines = (): Position[] => {
    throw new Error('You forgot to override me!');
  };

  getGuides = (): PieceGuide[] => {
    const candidates: PieceGuideCandidates[] = [];

    const snapPositions = this.getSnapLines();
    snapPositions.forEach((pos) => {
      if (this.imageRef.current) {
        const currentPosition = this.imageRef.current.getPosition();
        const xDiff = Math.abs(pos.x - currentPosition.x);
        const yDiff = Math.abs(pos.y - currentPosition.y);

        candidates.push({
          position: pos,
          xDiff: xDiff,
          yDiff: yDiff
        });
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
