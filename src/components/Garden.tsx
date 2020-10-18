import React from "react";
import {Line} from "react-konva";

type GardenProps = {
    middle: Array<number>;
    vertex1: Array<number>;
    vertex2: Array<number>;
    fill: string;
}

function Garden(props: GardenProps): React.ReactElement {
    return (
        <Line
            points={[props.middle[0], props.middle[1],
                props.vertex1[0], props.vertex1[1],
                props.vertex2[0], props.vertex2[1]]}
            fill={props.fill}
            opacity={.5}
            closed={true}
        ></Line>
    );
}

export default Garden;
