import React from 'react';
import { Group, Layer } from 'react-konva';

type PieceSelectionProps = {
  pieces: JSX.Element[];
};

export class PieceSelection extends React.Component<PieceSelectionProps> {
  constructor(props: PieceSelectionProps) {
    super(props);
  }

  render() {
    return (
      <Layer offsetX={-350} offsetY={-350}>
        <Group>{this.props.pieces}</Group>
      </Layer>
    );
  }
}
