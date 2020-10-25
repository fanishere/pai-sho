import React from 'react';
import lily from '../../assets/Lily_final.svg';
import { Image } from 'react-konva';
import { debounce } from 'underscore';
import Konva from 'konva';
import {
  PieceGuide,
  PieceGuideCandidates,
  Position,
  PieceData,
  Side
} from '../types';

export interface PieceProps {
  position: Position;
  name: string;
  gridWidth: number;
  side: Side;
  onDragMove: (p: Piece) => void;
  onDragEnd: (p: Piece) => void;
}

interface PieceInt {
  getSnapLines: () => Position[];
}

export class Piece
  extends React.Component<PieceProps, PieceData>
  implements PieceInt {
  readonly imageRef: React.RefObject<Konva.Image>;
  image: HTMLImageElement | undefined;
  constructor(props: PieceProps) {
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
    const candidates: PieceGuide[] = [];

    const snapPositions = this.getSnapLines();
    snapPositions.forEach((pos) => {
      if (this.imageRef.current) {
        // TODO check current position is dynamic
        const currentPosition = this.imageRef.current.getPosition();
        const xDiff = Math.abs(pos.x - currentPosition.x);
        const yDiff = Math.abs(pos.y - currentPosition.y);

        candidates.push({
          position: pos,
          offset: Math.max(xDiff, yDiff)
        });
      }
    });

    // return sorted candidate positions
    return candidates.sort((a, b) => {
      return a.offset - b.offset;
    });
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
        image={this.image}
        width={30}
        height={30}
        draggable={true}
        stroke={this.props.side}
      />
    );
  }
}
