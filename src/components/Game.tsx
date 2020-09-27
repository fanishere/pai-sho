import React from "react";
import {Circle, Group, Layer, Line, Rect, Stage, Wedge} from "react-konva";
import {Piece} from "./Piece";
import {PieceGuide, Position} from "./types";

type GameProps = {
    width: number;
    height: number;
    radius: number;
    gridCount: number;
}

type GameState = {
    positionsVisible: PieceGuide[];
    piecePositions: StringArray;
}

type PieceData = {
    position: Position
}
interface StringArray {
    [index: string]: PieceData;
}

class Game extends React.Component<GameProps, GameState> {
    private layerRef: React.RefObject<any>;
    private pieceRef: React.RefObject<Piece>;
    constructor(props: any) {
        super(props);

        this.layerRef = React.createRef();
        this.pieceRef = React.createRef();
        this.handlePieceMoving = this.handlePieceMoving.bind(this);
        this.handlePieceMoved = this.handlePieceMoved.bind(this);
        this.state = {
            positionsVisible: [],
            piecePositions: {
                "first": {position: {x:0, y:0}}
            }
        };
    }
    isVisible = (pos: Position):boolean => {
        let p = this.state.positionsVisible.find((guide) => {
            return (Math.abs(guide.position.x - pos.x) < 30) && (Math.abs(guide.position.y - pos.y) < 30);
        })

        return p !== undefined;
    }
    handlePieceMoving(piece: Piece, position: Position) {
        // get guide positions that apply to this piece [will use original piece position]
        let guides = piece.getGuides();
        this.setState({
            positionsVisible: guides
        })
    }
    handlePieceMoved = (piece: Piece, position: Position) => {
        if (this.state.positionsVisible.length < 1) {
            return
        }
        let guide = this.state.positionsVisible[0];
        let snapPosition = guide.position;
        if (guide.offset > 15) {
            snapPosition = {x:0, y:0}
        }
        let piecePositions = this.state.piecePositions;
        piecePositions[piece.props.name] = {position: snapPosition}
        this.setState({
            piecePositions: piecePositions,
            positionsVisible: []
        });
    }
    isInsideGameBoard = (x1: number, x2: number, y1: number, y2: number,) => {
        return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) >= this.props.radius*this.props.radius;
    }
    clipFunc = (ctx: CanvasRenderingContext2D) => {
        ctx.arc(
            0,
            0,
            this.props.radius,
            0,
            Math.PI * 2,
            false);
    };
    render() {
        let smallGridWidth = this.props.radius / (this.props.gridCount/2);
        let vertices: {x: number, y:number}[][] = Array(this.props.gridCount).fill("").map((_, i) => {
            return Array(this.props.gridCount).fill("").map((_, j) => {
                return {
                    x: (smallGridWidth*i) - this.props.radius,
                    y: (smallGridWidth*j) - this.props.radius
                }
            })
        })
        let pieces = Object.keys(this.state.piecePositions).map(key => {
            let p = this.state.piecePositions[key]
            return <Piece
                ref={this.pieceRef}
                key={key}
                name={key}
                position={p.position}
                onDragMove={this.handlePieceMoving}
                onDragEnd={this.handlePieceMoved}
                gridWidth={smallGridWidth}
            ></Piece>
        });

        return (
            <Layer
                offsetX={-this.props.radius}
                offsetY={-this.props.radius}
                ref={this.layerRef}
            >
                <Group
                    clipFunc={this.clipFunc}
                >

                    <Circle
                        x={0}
                        y={0}
                        radius={this.props.radius}
                        fill="pink"
                    ></Circle>

                    {/*grids*/}
                    {vertices.map((vertex, i) => {
                        return vertex.map((v, i) => {
                            return <Rect
                                key={i}
                                x={v.x}
                                y={v.y}
                                width={smallGridWidth}
                                height={smallGridWidth}
                                stroke="white"
                            />
                        })
                    })}

                    {/*guides*/}
                    {vertices.map((vertex, i) => {
                        return vertex.map((v, i) => {
                            return <Circle
                                visible={this.isVisible({x:v.x, y:v.y})}
                                key={i}
                                x={v.x}
                                y={v.y}
                                stroke="white"
                                fill={"red"}
                                radius={5}
                            />
                        })
                    })}
                    <Gate
                        x={(smallGridWidth * 2) - this.props.radius}
                        y={0}
                        gridWidth={smallGridWidth}
                        gameRadius={this.props.width}
                        rotation={90}
                    ></Gate>
                    <Gate
                        x={0}
                        y={this.props.radius - (smallGridWidth * 2)}
                        gridWidth={smallGridWidth}
                        gameRadius={this.props.width}
                        rotation={0}
                    ></Gate>
                    <Gate
                        x={0}
                        y={(smallGridWidth * 2) - this.props.radius}
                        gridWidth={smallGridWidth}
                        gameRadius={this.props.width}
                        rotation={180}
                    ></Gate>
                    <Gate
                        x={this.props.radius - (smallGridWidth * 2)}
                        y={0}
                        gridWidth={smallGridWidth}
                        gameRadius={this.props.width}
                        rotation={270}
                    ></Gate>
                    <Garden
                        middle={[0, 0]}
                        vertex1={[(smallGridWidth * 2) - this.props.radius, 0]}
                        vertex2={[0, (smallGridWidth * 2) - this.props.radius]}
                        fill={"#fef3ed"}
                    ></Garden>
                    <Garden
                        middle={[0, 0]}
                        vertex1={[this.props.radius - (smallGridWidth * 2), 0]}
                        vertex2={[0, (smallGridWidth * 2) - this.props.radius]}
                        fill={"red"}
                    ></Garden>
                    <Garden
                        middle={[0, 0]}
                        vertex1={[this.props.radius - (smallGridWidth * 2), 0]}
                        vertex2={[0, this.props.radius - (smallGridWidth * 2)]}
                        fill={"#fef3ed"}
                    ></Garden>
                    <Garden
                        middle={[0, 0]}
                        vertex1={[(smallGridWidth * 2) - this.props.radius, 0]}
                        vertex2={[0, this.props.radius - (smallGridWidth * 2)]}
                        fill={"red"}
                    ></Garden>
                    {pieces}
                </Group>


            </Layer>
        );
    }
}

class PaiSho extends React.Component<any> {
    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Game height={300} width={300} radius={300} gridCount={18}></Game>
            </Stage>
        );
    }
}

type GardenProps = {
    middle: Array<number>;
    vertex1: Array<number>;
    vertex2: Array<number>;
    fill: string;
}

class Garden extends React.Component<GardenProps> {
    render() {
        return (
            <Line
                points={[this.props.middle[0], this.props.middle[1],
                    this.props.vertex1[0], this.props.vertex1[1],
                    this.props.vertex2[0], this.props.vertex2[1]]}
                fill={this.props.fill}
                opacity={.5}
                closed={true}
            ></Line>
        );
    }
}

type GateProps = {
    x: number;
    y: number;
    gameRadius: number;
    gridWidth: number;
    rotation: number;
}

class Gate extends React.Component<GateProps> {
    circleDistanceCalc = (start: number, radians: number): number => {
        return start + radians;
    }
    render() {
        let rotation = this.props.rotation + 42.5;
        return (
            <Wedge
                x={this.props.x}
                y={this.props.y}
                angle={96}
                radius={95}
                fill={"red"}
                rotation={rotation}
                opacity={.5}
            >
            </Wedge>
        );
    }
}

export default PaiSho;