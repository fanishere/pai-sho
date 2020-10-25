import React from 'react';
import { Circle, Group, Layer, Rect, Stage } from 'react-konva';
import { Piece, PieceProps } from './Piece/Piece';
import { PieceDataList, PieceGuide } from './types';
import Konva from 'konva';
import Gate from './Gate';
import Garden from './Garden';
import { JadePiece, JasminePiece, RosePiece } from './Piece/FlowerPiece';

type GameProps = {
  width: number;
  height: number;
  radius: number;
  gridCount: number;
};

type GameState = {
  guidesVisible: PieceGuide[];
  piecePositions: PieceDataList;
};

class Game extends React.Component<GameProps, GameState> {
  private layerRef: React.RefObject<Konva.Layer> | null | undefined;
  constructor(props: GameProps) {
    super(props);

    this.layerRef = React.createRef();
    this.handlePieceMoving = this.handlePieceMoving.bind(this);
    this.handlePieceMoved = this.handlePieceMoved.bind(this);
    this.state = {
      guidesVisible: [],
      piecePositions: {
        first: { position: { x: 0, y: 0 } }
      }
    };
  }
  handlePieceMoving(piece: Piece): void {
    // get guide positions that apply to this piece [will use original piece position]
    const guides = piece.getGuides();
    this.setState({
      guidesVisible: guides
    });
  }
  handlePieceMoved = (piece: Piece): void => {
    const guides = piece.getGuides();
    if (guides.length < 1) {
      return;
    }

    const guide = guides[0];
    let snapPosition = guide.position;
    // offset is too large so snap to original position
    if (guide.offset > 15) {
      snapPosition = { x: 0, y: 0 };
    }
    const piecePositions = this.state.piecePositions;
    piecePositions[piece.props.name] = { position: snapPosition };
    this.setState({
      piecePositions: piecePositions,
      guidesVisible: []
    });
  };
  isInsideGameBoard = (
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ): boolean => {
    return (
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) >=
      this.props.radius * this.props.radius
    );
  };
  clipFunc = (ctx: CanvasRenderingContext2D): void => {
    // clip a full circle of this.props.radius
    ctx.arc(0, 0, this.props.radius, 0, Math.PI * 2);
  };
  render(): React.ReactNode {
    const smallGridWidth = this.props.radius / (this.props.gridCount / 2);
    const vertices: { x: number; y: number }[][] = Array(this.props.gridCount)
      .fill('')
      .map((_, i: number) => {
        return Array(this.props.gridCount)
          .fill('')
          .map((_, j) => {
            return {
              x: smallGridWidth * i - this.props.radius,
              y: smallGridWidth * j - this.props.radius
            };
          });
      });
    const pieces = Object.keys(this.state.piecePositions).map((key) => {
      const p = this.state.piecePositions[key];
      return (
        <RosePiece
          side={'red'}
          key={key}
          name={key}
          position={p.position}
          onDragMove={this.handlePieceMoving}
          onDragEnd={this.handlePieceMoved}
          gridWidth={smallGridWidth}
        />
      );
    });

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer
          offsetX={-this.props.radius}
          offsetY={-this.props.radius}
          ref={this.layerRef}
        >
          <Group clipFunc={this.clipFunc}>
            <Circle x={0} y={0} radius={this.props.radius} fill="pink"></Circle>

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
            {this.state.guidesVisible.map((guide, i) => {
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
              x={smallGridWidth * 2 - this.props.radius}
              y={0}
              gridWidth={smallGridWidth}
              gameRadius={this.props.width}
              rotation={90}
            ></Gate>
            <Gate
              x={0}
              y={this.props.radius - smallGridWidth * 2}
              gridWidth={smallGridWidth}
              gameRadius={this.props.width}
              rotation={0}
            ></Gate>
            <Gate
              x={0}
              y={smallGridWidth * 2 - this.props.radius}
              gridWidth={smallGridWidth}
              gameRadius={this.props.width}
              rotation={180}
            ></Gate>
            <Gate
              x={this.props.radius - smallGridWidth * 2}
              y={0}
              gridWidth={smallGridWidth}
              gameRadius={this.props.width}
              rotation={270}
            ></Gate>
            <Garden
              middle={[0, 0]}
              vertex1={[smallGridWidth * 2 - this.props.radius, 0]}
              vertex2={[0, smallGridWidth * 2 - this.props.radius]}
              fill={'#fef3ed'}
            ></Garden>
            <Garden
              middle={[0, 0]}
              vertex1={[this.props.radius - smallGridWidth * 2, 0]}
              vertex2={[0, smallGridWidth * 2 - this.props.radius]}
              fill={'red'}
            ></Garden>
            <Garden
              middle={[0, 0]}
              vertex1={[this.props.radius - smallGridWidth * 2, 0]}
              vertex2={[0, this.props.radius - smallGridWidth * 2]}
              fill={'#fef3ed'}
            ></Garden>
            <Garden
              middle={[0, 0]}
              vertex1={[smallGridWidth * 2 - this.props.radius, 0]}
              vertex2={[0, this.props.radius - smallGridWidth * 2]}
              fill={'red'}
            ></Garden>
            {pieces}
          </Group>
        </Layer>
      </Stage>
    );
  }
}

export default Game;
