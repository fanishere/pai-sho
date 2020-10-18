/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { Piece } from './Piece';
import { Layer, Stage } from 'react-konva';
import { mount, shallow } from 'enzyme';
import Konva from 'konva';
import { Position } from './types';

declare module 'konva/types/Stage' {
  interface Stage {
    simulateMouseDown: (pos: Position) => void;
    simulateMouseMove: (pos: Position) => void;
    simulateMouseUp: (pos: Position) => void;
  }
}

Konva.Stage.prototype.simulateMouseDown = function (pos: Position): void {
  const top = this.content.getBoundingClientRect().top;

  this._mousedown({
    clientX: pos.x,
    clientY: pos.y + top,
    button: 0
  });
};

Konva.Stage.prototype.simulateMouseMove = function (pos: Position): void {
  const top = this.content.getBoundingClientRect().top;

  const evt = {
    clientX: pos.x,
    clientY: pos.y + top,
    button: 2
  };

  this._mousemove(evt);
  Konva.DD._drag(evt);
};

Konva.Stage.prototype.simulateMouseUp = function (pos: Position): void {
  const top = this.content.getBoundingClientRect().top;

  const evt = {
    clientX: pos.x,
    clientY: pos.y + top,
    button: 2
  };

  Konva.DD._endDragBefore(evt);
  this._mouseup(evt);
  Konva.DD._endDragAfter(evt);
};

describe('Test render', () => {
  let instance: App;
  class App extends React.Component {
    stage: Konva.Stage | null | undefined;
    layer: Konva.Layer | null | undefined;
    piece: Piece | null | undefined;

    render(): React.ReactNode {
      return (
        <Stage ref={(node): Konva.Stage | null => (this.stage = node)}>
          <Layer ref={(node): Konva.Layer | null => (this.layer = node)}>
            <Piece
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={jest.fn()}
              onDragMove={jest.fn()}
              position={{ x: 1, y: 0 }}
              ref={(node): Piece | null => (this.piece = node)}
            />
          </Layer>
        </Stage>
      );
    }
  }

  beforeEach(() => {
    const wrapper = mount(<App />);
    instance = wrapper.instance() as App;
  });

  it('renders piece with props', () => {
    expect(instance).toMatchSnapshot();
  });

  it('renders with the props set', () => {
    const piece = instance.piece;
    expect(piece?.props.gridWidth).toEqual(20);
    expect(piece?.props.position).toEqual({ x: 1, y: 0 });
    expect(piece?.props.name).toEqual('test_piece');
  });
});

describe('Test getGuides', () => {
  let instance: App;
  class App extends React.Component {
    stage: Konva.Stage | null | undefined;
    layer: Konva.Layer | null | undefined;
    piece: Piece | null | undefined;

    render(): React.ReactNode {
      return (
        <Stage ref={(node): Konva.Stage | null => (this.stage = node)}>
          <Layer ref={(node): Konva.Layer | null => (this.layer = node)}>
            <Piece
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={jest.fn()}
              onDragMove={jest.fn()}
              position={{ x: 0, y: 0 }}
              ref={(node): Piece | null => (this.piece = node)}
            />
          </Layer>
        </Stage>
      );
    }
  }

  beforeEach(() => {
    const wrapper = mount(<App />);
    instance = wrapper.instance() as App;
  });

  it('getSnapLines gets box of 9 positions', () => {
    const snapLines = instance.piece?.getSnapLines();
    const expectedSnapLines = [
      { x: -20, y: -20 },
      { x: -20, y: 0 },
      { x: -20, y: 20 },
      { x: 0, y: -20 },
      { x: 0, y: 0 },
      { x: 0, y: 20 },
      { x: 20, y: -20 },
      { x: 20, y: 0 },
      { x: 20, y: 20 }
    ];
    expect(snapLines).toEqual(expectedSnapLines);
  });

  it('getGuides gets box of 9 positions sorted with offsets', () => {
    const guides = instance.piece?.getGuides();
    const expectedSnapLines = [
      {
        position: { x: 0, y: 0 },
        offset: 0
      },
      {
        position: { x: 0, y: -20 },
        offset: 20
      },
      {
        position: { x: 0, y: 20 },
        offset: 20
      },
      {
        position: { x: -20, y: 0 },
        offset: 20
      },
      {
        position: { x: 20, y: 0 },
        offset: 20
      },
      {
        position: { x: -20, y: -20 },
        offset: 20
      },
      {
        position: { x: -20, y: 20 },
        offset: 20
      },
      {
        position: { x: 20, y: -20 },
        offset: 20
      },
      {
        position: { x: 20, y: 20 },
        offset: 20
      }
    ];
    expect(guides).toEqual(expectedSnapLines);
  });
});

describe('Test drag interactions', () => {
  let instance: App | null;

  let onDragMove = jest.fn();
  let onDragEnd = jest.fn();
  class App extends React.Component {
    stage: Konva.Stage | null | undefined;
    layer: Konva.Layer | null | undefined;
    piece: Piece | null | undefined;

    render(): React.ReactNode {
      return (
        <Stage
          ref={(node): Konva.Stage | null => (this.stage = node)}
          width={300}
          height={300}
        >
          <Layer ref={(node): Konva.Layer | null => (this.layer = node)}>
            <Piece
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={onDragEnd}
              onDragMove={onDragMove}
              position={{ x: 0, y: 0 }}
              ref={(node): Piece | null => (this.piece = node)}
            />
          </Layer>
        </Stage>
      );
    }
  }

  beforeEach(() => {
    onDragMove = jest.fn();
    onDragEnd = jest.fn();
    const wrapper = mount(<App />);
    instance = wrapper.instance() as App;
  });

  it('calls onDragMove with piece and position', () => {
    const stage = Konva.stages[Konva.stages.length - 1];
    stage.simulateMouseDown({ x: 0, y: 0 });
    if (instance?.piece?.imageRef.current) {
      instance.piece?.imageRef.current.startDrag();
    }
    stage.simulateMouseMove({ x: 20, y: 30 });

    if (instance?.piece?.imageRef.current) {
      expect(instance.piece.imageRef.current.isDragging()).toEqual(true);
      expect(onDragMove).toHaveBeenCalledTimes(1);
      expect(onDragMove).toHaveBeenCalledWith(instance.piece);

      expect(onDragEnd).toHaveBeenCalledTimes(0);
    }
  });

  it('calls onDragEnd with piece and position', () => {
    const stage = Konva.stages[Konva.stages.length - 1];
    stage.simulateMouseDown({ x: 0, y: 0 });
    if (instance?.piece?.imageRef.current) {
      instance.piece?.imageRef.current.startDrag();
    }
    stage.simulateMouseMove({ x: 20, y: 20 });

    if (instance?.piece?.imageRef.current) {
      instance.piece?.imageRef.current.stopDrag();

      expect(instance.piece.imageRef.current.isDragging()).toEqual(false);
      expect(onDragEnd).toHaveBeenCalledTimes(1);
      expect(onDragEnd).toHaveBeenCalledWith(instance.piece);

      expect(onDragMove).toHaveBeenCalledTimes(1);
    }
  });
});

describe('Test onDragEnd updates position', () => {
  const onDragMove = jest.fn();
  const onDragEnd = jest.fn();
  const wrapper = shallow(
    <Piece
      gridWidth={20}
      name={'test_piece'}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}
      position={{ x: 0, y: 0 }}
    />
  );

  it('onDragEnd updates image position', () => {
    wrapper.setState({ position: { x: 20, y: 20 } });
    wrapper.simulate('dragEnd', { target: { attrs: { x: 20, y: 20 } } });
    const pieceProps = wrapper.props();

    // assert image position
    expect(pieceProps.x).toEqual(20);
    expect(pieceProps.y).toEqual(20);
  });
});
