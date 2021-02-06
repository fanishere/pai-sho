import React, { FunctionComponent, RefObject } from 'react';

import { Image } from 'react-konva';
import { debounce } from 'underscore';
import { PieceGuide, Position, Side } from '../types';
import { useDispatch } from 'react-redux';
import { movePiece, removeGuides, setGuides } from '../../store/actions';
import useImage from 'use-image';
import Konva from 'konva';

export interface PieceProps {
  position: Position | null;
  name: string;
  gridWidth: number;
  side: Side;
  imgSrc: string;
  spaces: number;
}

export const Piece: FunctionComponent<PieceProps> = (props: PieceProps) => {
  const dispatch = useDispatch();

  const imageRef: RefObject<Konva.Image> | null | undefined = React.createRef();
  const getSnapLines = (): Position[] => {
    const lines: Position[] = [];
    if (imageRef.current === null) {
      return lines;
    }
    const currentPosition = imageRef.current.getPosition();
    console.log(currentPosition);
    if (props.position === null) {
      const starterLines = [
        {
          x: 0,
          y: -300
        },
        {
          x: 300,
          y: 0
        },
        {
          x: 0,
          y: 300
        },
        {
          x: -300,
          y: 0
        }
      ];
      return starterLines;
    }
    for (let i = 0; i <= props.spaces; i++) {
      for (let j = 0; j <= props.spaces; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        lines.push({
          x: props.position.x - props.gridWidth * i,
          y: props.position.y - props.gridWidth * j
        });
        lines.push({
          x: props.position.x + props.gridWidth * i,
          y: props.position.y + props.gridWidth * j
        });

        if (i !== 0 && j !== 0) {
          lines.push({
            x: props.position.x + props.gridWidth * i,
            y: props.position.y - props.gridWidth * j
          });

          lines.push({
            x: props.position.x - props.gridWidth * i,
            y: props.position.y + props.gridWidth * j
          });
        }
      }
    }

    return lines;
  };
  const getGuides = (): PieceGuide[] => {
    const candidates: PieceGuide[] = [];

    if (props.position === undefined) {
      console.log('sdfsfs');
    }

    const snapPositions = getSnapLines();
    snapPositions.forEach((pos) => {
      if (imageRef.current) {
        // TODO check current position is dynamic
        const currentPosition = imageRef.current.getPosition();
        const xDiff = Math.abs(pos.x - currentPosition.x);
        const yDiff = Math.abs(pos.y - currentPosition.y);

        candidates.push({
          position: pos,
          offset: Math.max(xDiff, yDiff)
        });
      }
    });

    // return sorted candidate positions
    return candidates.sort((a, b) => {
      return a.offset - b.offset;
    });
  };

  const handleChange = (): void => {
    const guides = getGuides();
    dispatch(setGuides(guides));
  };
  const handleMove = (): void => {
    const guides = getGuides();
    if (guides.length < 1) {
      return;
    }

    const guide = guides[0];
    let snapPosition = guide.position;
    // offset is too large so snap to original position
    if (guide.offset > 15 && props.position) {
      snapPosition = props.position;
    }

    dispatch(movePiece(props.name, snapPosition));

    if (imageRef.current && props.position) {
      imageRef.current.setPosition(props.position);
    }
    dispatch(removeGuides);
  };

  const image = document.createElement('img');
  image.src = props.imgSrc;
  const [newImg] = useImage(props.imgSrc);

  let x = 300;
  let y = 0;
  if (props.position != undefined) {
    x = props.position.x;
    y = props.position.y;
  }

  return (
    <Image
      image={newImg}
      ref={imageRef}
      offset={{ x: 15, y: 15 }}
      onDragMove={debounce(handleChange, 25, true)}
      onDragEnd={handleMove}
      x={x}
      y={y}
      width={30}
      height={30}
      draggable={true}
      stroke={props.side}
    ></Image>
  );
};
