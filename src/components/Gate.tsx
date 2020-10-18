import React from "react";
import {Wedge} from "react-konva";

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
    render(): React.ReactNode {
        const rotation = this.props.rotation + 42.5;
        return (
            <Wedge
                x={this.props.x}
                y={this.props.y}
                // TODO make numbers not hard coded
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

export default Gate;
