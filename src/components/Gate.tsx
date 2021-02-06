import React, { FunctionComponent } from 'react';
import { Wedge } from 'react-konva';

type GateProps = {
  x: number;
  y: number;
  gameRadius: number;
  gridWidth: number;
  rotation: number;
};

const Gate: FunctionComponent<GateProps> = (props: GateProps) => {
  // const circleDistanceCalc = (start: number, radians: number): number => {
  //   return start + radians;
  // };
  const rotation = props.rotation + 42.5;
  return (
    <Wedge
      x={props.x}
      y={props.y}
      // TODO make numbers not hard coded
      angle={96}
      radius={95}
      fill={'red'}
      rotation={rotation}
      opacity={0.5}
    ></Wedge>
  );
};

export default Gate;
