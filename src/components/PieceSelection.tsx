import React, { FunctionComponent } from 'react';
import { Group, Layer } from 'react-konva';

type PieceSelectionProps = {
  pieces: JSX.Element[];
};

const PieceSelection: FunctionComponent<PieceSelectionProps> = (
  props: PieceSelectionProps
) => {
  return (
    <Layer offsetX={-350} offsetY={-350}>
      <Group>{props.pieces}</Group>
    </Layer>
  );
};

export default PieceSelection;
