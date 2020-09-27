import React from "react";
import {KonvaEventObject} from "konva/types/Node";
import lily from "../assets/Lily_final.svg";
import {Image} from "react-konva";
import {debounce} from "underscore";
import Konva from "konva";
import {PieceGuide, PieceGuideCandidates, Position} from "./types";


type PieceProps = {
    position: Position
    name: string
    gridWidth: number
    onDragMove: (p: Piece, position: Position) => void
    onDragEnd: (p: Piece, position: Position) => void
}

type PieceState = {
    position: Position
}

export class Piece extends React.Component<PieceProps, PieceState> {
    readonly imageRef: React.RefObject<Konva.Image>;
    constructor(props: any) {
        super(props);

        this.imageRef = React.createRef();
        this.handleChange = debounce(
            this.handleChange.bind(this),
            25,
            true);
        this.handleMove = this.handleMove.bind(this);
        this.state = {
            position: this.props.position,
        };
    }

    // TODO name the positions
    getSnapLines = (): Position[] => {
        let lines: Position[] = []
        let vertical = [
            this.props.position.x - this.props.gridWidth,
            this.props.position.x,
            this.props.position.x + this.props.gridWidth,
        ];
        let horizontal = [
            this.props.position.y - this.props.gridWidth,
            this.props.position.y,
            this.props.position.y + this.props.gridWidth,
        ];
        vertical.map((v, i) => {
            horizontal.map((h, j) => {
                lines.push({
                    x: v,
                    y: h,
                })
            })
        })

        return lines
    }

    getGuides = (): PieceGuide[] => {
        var GUIDELINE_OFFSET = 100;
        let candidates: PieceGuideCandidates[] = [];
        let offset = 15;

        let snapPositions = this.getSnapLines();
        snapPositions.forEach((pos) => {
            if (this.imageRef.current) {
                let currentPosition = this.imageRef.current.getPosition()
                let xDiff = Math.abs(pos.x - currentPosition.x);
                let yDiff = Math.abs(pos.y - currentPosition.y);

                // if the distance between guild line and
                // object snap point is close we can consider this for snapping
                if (xDiff < GUIDELINE_OFFSET && yDiff < GUIDELINE_OFFSET) {
                    candidates.push({
                        position: pos,
                        xDiff: xDiff,
                        yDiff: yDiff,
                        offset: 15,
                    });
                }
            }
        })

        let guides: PieceGuide[] = [];

        // sort guides
        candidates.sort(
            (a, b) => {
                if (a.xDiff === b.xDiff) {
                    return a.yDiff - b.yDiff;
                }
                return a.xDiff - b.xDiff;
            }).forEach((pos) => {
            guides.push({
                position: pos.position,
                offset: Math.max(pos.xDiff, pos.yDiff),
            });
        })

        return guides;
    }
    handleChange(e: KonvaEventObject<DragEvent>) {
        this.props.onDragMove(
            this,
            {
                x: e.target.attrs.x,
                y: e.target.attrs.y
            });
    }
    handleMove = (e: KonvaEventObject<DragEvent>) => {
        this.props.onDragEnd(this,
            {
                x: e.target.attrs.x,
                y: e.target.attrs.y
            });

        if (this.imageRef.current) {
            this.imageRef.current.setPosition(this.props.position);
        }
    }

    render() {
        let img = document.createElement('img');
        img.src = lily;

        return (
                <Image
                    ref={this.imageRef}
                    offset={{x: 15, y: 15}}
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
