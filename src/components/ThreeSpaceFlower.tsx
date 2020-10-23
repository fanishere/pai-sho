import React from 'react';
import { Position } from './types';
import lily from '../assets/Lily_final.svg';
import { Image } from 'react-konva';
import { Piece, PieceProps } from './Piece';

export interface FlowerPieceProps extends PieceProps {
  spaces: number;
}

export class FlowerPiece extends Piece<FlowerPieceProps> {
  spaces: number;
  constructor(props: FlowerPieceProps) {
    super(props);

    this.spaces = 3;
  }
  getSnapLines = (): Position[] => {
    const lines: Position[] = [];
    for (let i = 0; i <= this.spaces; i++) {
      for (let j = 0; j <= this.spaces; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        lines.push({
          x: this.props.position.x - this.props.gridWidth * i,
          y: this.props.position.y - this.props.gridWidth * j
        });

        lines.push({
          x: this.props.position.x + this.props.gridWidth * i,
          y: this.props.position.y - this.props.gridWidth * j
        });

        lines.push({
          x: this.props.position.x + this.props.gridWidth * i,
          y: this.props.position.y + this.props.gridWidth * j
        });

        lines.push({
          x: this.props.position.x - this.props.gridWidth * i,
          y: this.props.position.y + this.props.gridWidth * j
        });
      }
    }

    return lines;
  };

  // TODO: override image
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
