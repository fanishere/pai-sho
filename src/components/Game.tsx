import React, { FunctionComponent, ReactElement } from 'react';
import { Circle, Group, Layer, Rect, Stage } from 'react-konva';
import { Piece } from './Piece/Piece';
import Konva from 'konva';
import Gate from './Gate';
import Garden from './Garden';
import PieceSelection from './PieceSelection';
import { useSelector, ReactReduxContext, Provider } from 'react-redux';
import { guidesSelector, piecesSelector } from '../store/selectors';
import rose from '../assets/rose.svg';

export type GameProps = {
  width: number;
  height: number;
  radius: number;
  gridCount: number;
};

const Game: FunctionComponent<GameProps> = (props: GameProps) => {
  const guidesVisible = useSelector(guidesSelector);
  // const isInsideGameBoard = (
  //   x1: number,
  //   x2: number,
  //   y1: number,
  //   y2: number
  // ): boolean => {
  //   return (
  //     Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) >= props.radius * props.radius
  //   );
  // };
  const clipFunc = (ctx: CanvasRenderingContext2D): void => {
    // clip a full circle of this.props.radius
    ctx.arc(0, 0, props.radius, 0, Math.PI * 2);
  };
  const layerRef:
    | React.RefObject<Konva.Layer>
    | null
    | undefined = React.createRef();
  const pieces = useSelector(piecesSelector);

  const smallGridWidth = props.radius / (props.gridCount / 2);
  const vertices: { x: number; y: number }[][] = Array(props.gridCount)
    .fill('')
    .map((_, i: number) => {
      return Array(props.gridCount)
        .fill('')
        .map((_, j) => {
          return {
            x: smallGridWidth * i - props.radius,
            y: smallGridWidth * j - props.radius
          };
        });
    });
  const boardPieces = pieces.map((piece) => {
    return (
      <Piece
        key={piece.name}
        name={piece.name}
        gridWidth={smallGridWidth}
        side={'red'}
        imgSrc={rose}
        spaces={3}
        position={piece.position}
      />
    );
  });

  return (
    <ReactReduxContext.Consumer>
      {({ store }): ReactElement => (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Provider store={store}>
            <Layer
              offsetX={-props.radius}
              offsetY={-props.radius}
              ref={layerRef}
            >
              <Group clipFunc={clipFunc}>
                <Circle x={0} y={0} radius={props.radius} fill="pink"></Circle>

                {/*grids*/}
                {vertices.map((vertex, i) => {
                  return vertex.map((v, j) => {
                    return (
                      <Rect
                        // TODO make this key unique
                        key={i + j}
                        x={v.x}
                        y={v.y}
                        width={smallGridWidth}
                        height={smallGridWidth}
                        stroke="white"
                      />
                    );
                  });
                })}

                {/*guides*/}
                {guidesVisible.map((guide, i) => {
                  return (
                    <Circle
                      // TODO make this key unique
                      key={i}
                      x={guide.position.x}
                      y={guide.position.y}
                      stroke="white"
                      fill={'red'}
                      radius={5}
                    />
                  );
                })}

                <Gate
                  x={smallGridWidth * 2 - props.radius}
                  y={0}
                  gridWidth={smallGridWidth}
                  gameRadius={props.width}
                  rotation={90}
                ></Gate>
                <Gate
                  x={0}
                  y={props.radius - smallGridWidth * 2}
                  gridWidth={smallGridWidth}
                  gameRadius={props.width}
                  rotation={0}
                ></Gate>
                <Gate
                  x={0}
                  y={smallGridWidth * 2 - props.radius}
                  gridWidth={smallGridWidth}
                  gameRadius={props.width}
                  rotation={180}
                ></Gate>
                <Gate
                  x={props.radius - smallGridWidth * 2}
                  y={0}
                  gridWidth={smallGridWidth}
                  gameRadius={props.width}
                  rotation={270}
                ></Gate>
                <Garden
                  middle={[0, 0]}
                  vertex1={[smallGridWidth * 2 - props.radius, 0]}
                  vertex2={[0, smallGridWidth * 2 - props.radius]}
                  fill={'#fef3ed'}
                ></Garden>
                <Garden
                  middle={[0, 0]}
                  vertex1={[props.radius - smallGridWidth * 2, 0]}
                  vertex2={[0, smallGridWidth * 2 - props.radius]}
                  fill={'red'}
                ></Garden>
                <Garden
                  middle={[0, 0]}
                  vertex1={[props.radius - smallGridWidth * 2, 0]}
                  vertex2={[0, props.radius - smallGridWidth * 2]}
                  fill={'#fef3ed'}
                ></Garden>
                <Garden
                  middle={[0, 0]}
                  vertex1={[smallGridWidth * 2 - props.radius, 0]}
                  vertex2={[0, props.radius - smallGridWidth * 2]}
                  fill={'red'}
                ></Garden>
              </Group>
            </Layer>
            <PieceSelection pieces={boardPieces} />
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Game;
