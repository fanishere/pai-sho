/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { Piece } from './Piece';
import { Layer, Stage } from 'react-konva';
import { mount, shallow } from 'enzyme';
import Konva from 'konva';
import {
  Chrysanthemum,
  Jade,
  Jasmine,
  Lily,
  Rhododendron,
  Rose
} from './Flower';

describe('Test Rose/Jasmine', () => {
  let rose: RoseApp;
  let jasmine: JasmineApp;
  let pieces: Piece[];
  let onDragMove = jest.fn();
  let onDragEnd = jest.fn();

  class RoseApp extends React.Component {
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
            <Rose
              side={'red'}
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={onDragEnd}
              onDragMove={onDragMove}
              position={{ x: 1, y: 0 }}
              ref={(node): Piece | null => (this.piece = node)}
            />
          </Layer>
        </Stage>
      );
    }
  }

  class JasmineApp extends React.Component {
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
            <Rose
              side={'red'}
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={onDragEnd}
              onDragMove={onDragMove}
              position={{ x: 1, y: 0 }}
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
    const roseWrapper = mount(<RoseApp />);
    rose = roseWrapper.instance() as RoseApp;
    const jasmineWrapper = mount(<JasmineApp />);
    jasmine = jasmineWrapper.instance() as JasmineApp;

    if (rose.piece && jasmine.piece) {
      pieces = [rose.piece, jasmine.piece];
    }
  });

  describe('Test render', () => {
    it('renders piece with props', () => {
      expect(rose).toMatchSnapshot();
      expect(jasmine).toMatchSnapshot();
    });

    it('renders with the props set', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        expect(piece?.props.gridWidth).toEqual(20);
        expect(piece?.props.position).toEqual({ x: 1, y: 0 });
        expect(piece?.props.name).toEqual('test_piece');
      }
    });
  });

  describe('Test getGuides', () => {
    it('getSnapLines gets box of 48 positions', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const snapLines = piece?.getSnapLines();
        const expectedSnapLines = [
          { x: 1, y: -20 },
          { x: 1, y: 20 },
          { x: 1, y: -40 },
          { x: 1, y: 40 },
          { x: 1, y: -60 },
          { x: 1, y: 60 },
          { x: -19, y: 0 },
          { x: 21, y: 0 },
          { x: -19, y: -20 },
          { x: 21, y: 20 },
          { x: 21, y: -20 },
          { x: -19, y: 20 },
          { x: -19, y: -40 },
          { x: 21, y: 40 },
          { x: 21, y: -40 },
          { x: -19, y: 40 },
          { x: -19, y: -60 },
          { x: 21, y: 60 },
          { x: 21, y: -60 },
          { x: -19, y: 60 },
          { x: -39, y: 0 },
          { x: 41, y: 0 },
          { x: -39, y: -20 },
          { x: 41, y: 20 },
          { x: 41, y: -20 },
          { x: -39, y: 20 },
          { x: -39, y: -40 },
          { x: 41, y: 40 },
          { x: 41, y: -40 },
          { x: -39, y: 40 },
          { x: -39, y: -60 },
          { x: 41, y: 60 },
          { x: 41, y: -60 },
          { x: -39, y: 60 },
          { x: -59, y: 0 },
          { x: 61, y: 0 },
          { x: -59, y: -20 },
          { x: 61, y: 20 },
          { x: 61, y: -20 },
          { x: -59, y: 20 },
          { x: -59, y: -40 },
          { x: 61, y: 40 },
          { x: 61, y: -40 },
          { x: -59, y: 40 },
          { x: -59, y: -60 },
          { x: 61, y: 60 },
          { x: 61, y: -60 },
          { x: -59, y: 60 }
        ];
        expect(snapLines?.length).toEqual(48);
        expect(snapLines).toEqual(expectedSnapLines);
      }
    });

    it('getGuides gets box of 48 positions sorted with offsets', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];

        const guides = piece?.getGuides();
        expect(guides?.length).toEqual(48);

        expect(guides![0]).toEqual({
          position: { x: 1, y: -20 },
          offset: 20
        });
        expect(guides![guides!.length - 1]).toEqual({
          position: { x: -59, y: 60 },
          offset: 60
        });
      }
    });
  });
});

describe('Test Chrysanthemum/Lily', () => {
  let chrysanthemum: ChrysanthemumApp;
  let lily: LilyApp;
  let pieces: Piece[];
  let onDragMove = jest.fn();
  let onDragEnd = jest.fn();

  class ChrysanthemumApp extends React.Component {
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
            <Chrysanthemum
              side={'red'}
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={onDragEnd}
              onDragMove={onDragMove}
              position={{ x: 1, y: 0 }}
              ref={(node): Piece | null => (this.piece = node)}
            />
          </Layer>
        </Stage>
      );
    }
  }

  class LilyApp extends React.Component {
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
            <Lily
              side={'red'}
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={onDragEnd}
              onDragMove={onDragMove}
              position={{ x: 1, y: 0 }}
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
    const chrysanthemumWrapper = mount(<ChrysanthemumApp />);
    chrysanthemum = chrysanthemumWrapper.instance() as ChrysanthemumApp;
    const lilyWrapper = mount(<LilyApp />);
    lily = lilyWrapper.instance() as LilyApp;

    if (chrysanthemum.piece && lily.piece) {
      pieces = [chrysanthemum.piece, lily.piece];
    }
  });

  describe('Test render', () => {
    it('renders piece with props', () => {
      expect(chrysanthemum).toMatchSnapshot();
      expect(lily).toMatchSnapshot();
    });

    it('renders with the props set', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        expect(piece?.props.gridWidth).toEqual(20);
        expect(piece?.props.position).toEqual({ x: 1, y: 0 });
        expect(piece?.props.name).toEqual('test_piece');
      }
    });
  });

  describe('Test getGuides', () => {
    it('getSnapLines gets box of 80 positions', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const snapLines = piece?.getSnapLines();
        const expectedSnapLines = [
          { x: 1, y: -20 },
          { x: 1, y: 20 },
          { x: 1, y: -40 },
          { x: 1, y: 40 },
          { x: 1, y: -60 },
          { x: 1, y: 60 },
          { x: 1, y: -80 },
          { x: 1, y: 80 },
          { x: -19, y: 0 },
          { x: 21, y: 0 },
          { x: -19, y: -20 },
          { x: 21, y: 20 },
          { x: 21, y: -20 },
          { x: -19, y: 20 },
          { x: -19, y: -40 },
          { x: 21, y: 40 },
          { x: 21, y: -40 },
          { x: -19, y: 40 },
          { x: -19, y: -60 },
          { x: 21, y: 60 },
          { x: 21, y: -60 },
          { x: -19, y: 60 },
          { x: -19, y: -80 },
          { x: 21, y: 80 },
          { x: 21, y: -80 },
          { x: -19, y: 80 },
          { x: -39, y: 0 },
          { x: 41, y: 0 },
          { x: -39, y: -20 },
          { x: 41, y: 20 },
          { x: 41, y: -20 },
          { x: -39, y: 20 },
          { x: -39, y: -40 },
          { x: 41, y: 40 },
          { x: 41, y: -40 },
          { x: -39, y: 40 },
          { x: -39, y: -60 },
          { x: 41, y: 60 },
          { x: 41, y: -60 },
          { x: -39, y: 60 },
          { x: -39, y: -80 },
          { x: 41, y: 80 },
          { x: 41, y: -80 },
          { x: -39, y: 80 },
          { x: -59, y: 0 },
          { x: 61, y: 0 },
          { x: -59, y: -20 },
          { x: 61, y: 20 },
          { x: 61, y: -20 },
          { x: -59, y: 20 },
          { x: -59, y: -40 },
          { x: 61, y: 40 },
          { x: 61, y: -40 },
          { x: -59, y: 40 },
          { x: -59, y: -60 },
          { x: 61, y: 60 },
          { x: 61, y: -60 },
          { x: -59, y: 60 },
          { x: -59, y: -80 },
          { x: 61, y: 80 },
          { x: 61, y: -80 },
          { x: -59, y: 80 },
          { x: -79, y: 0 },
          { x: 81, y: 0 },
          { x: -79, y: -20 },
          { x: 81, y: 20 },
          { x: 81, y: -20 },
          { x: -79, y: 20 },
          { x: -79, y: -40 },
          { x: 81, y: 40 },
          { x: 81, y: -40 },
          { x: -79, y: 40 },
          { x: -79, y: -60 },
          { x: 81, y: 60 },
          { x: 81, y: -60 },
          { x: -79, y: 60 },
          { x: -79, y: -80 },
          { x: 81, y: 80 },
          { x: 81, y: -80 },
          { x: -79, y: 80 }
        ];
        expect(snapLines?.length).toEqual(80);
        expect(snapLines).toEqual(expectedSnapLines);
      }
    });

    it('getGuides gets box of 80 positions sorted with offsets', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];

        const guides = piece?.getGuides();
        expect(guides?.length).toEqual(80);

        expect(guides![0]).toEqual({
          position: { x: 1, y: -20 },
          offset: 20
        });
        expect(guides![guides!.length - 1]).toEqual({
          position: { x: -79, y: 80 },
          offset: 80
        });
      }
    });
  });
});

describe('Test Rhododendron/Jade', () => {
  let rhododendron: RhododendronApp;
  let jade: JadeApp;
  let pieces: Piece[];
  let onDragMove = jest.fn();
  let onDragEnd = jest.fn();

  class RhododendronApp extends React.Component {
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
            <Rhododendron
              side={'red'}
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={onDragEnd}
              onDragMove={onDragMove}
              position={{ x: 1, y: 0 }}
              ref={(node): Piece | null => (this.piece = node)}
            />
          </Layer>
        </Stage>
      );
    }
  }

  class JadeApp extends React.Component {
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
            <Jade
              side={'red'}
              gridWidth={20}
              name={'test_piece'}
              onDragEnd={onDragEnd}
              onDragMove={onDragMove}
              position={{ x: 1, y: 0 }}
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
    const rhododendronWrapper = mount(<RhododendronApp />);
    rhododendron = rhododendronWrapper.instance() as RhododendronApp;
    const jadeWrapper = mount(<JadeApp />);
    jade = jadeWrapper.instance() as JadeApp;

    if (rhododendron.piece && jade.piece) {
      pieces = [rhododendron.piece, jade.piece];
    }
  });

  describe('Test render', () => {
    it('renders piece with props', () => {
      expect(rhododendron).toMatchSnapshot();
      expect(jade).toMatchSnapshot();
    });

    it('renders with the props set', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        expect(piece?.props.gridWidth).toEqual(20);
        expect(piece?.props.position).toEqual({ x: 1, y: 0 });
        expect(piece?.props.name).toEqual('test_piece');
      }
    });
  });

  describe('Test getGuides', () => {
    it('getSnapLines gets box of 120 positions', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const snapLines = piece?.getSnapLines();
        const expectedSnapLines = [
          { x: 1, y: -20 },
          { x: 1, y: 20 },
          { x: 1, y: -40 },
          { x: 1, y: 40 },
          { x: 1, y: -60 },
          { x: 1, y: 60 },
          { x: 1, y: -80 },
          { x: 1, y: 80 },
          { x: 1, y: -100 },
          { x: 1, y: 100 },
          { x: -19, y: 0 },
          { x: 21, y: 0 },
          { x: -19, y: -20 },
          { x: 21, y: 20 },
          { x: 21, y: -20 },
          { x: -19, y: 20 },
          { x: -19, y: -40 },
          { x: 21, y: 40 },
          { x: 21, y: -40 },
          { x: -19, y: 40 },
          { x: -19, y: -60 },
          { x: 21, y: 60 },
          { x: 21, y: -60 },
          { x: -19, y: 60 },
          { x: -19, y: -80 },
          { x: 21, y: 80 },
          { x: 21, y: -80 },
          { x: -19, y: 80 },
          { x: -19, y: -100 },
          { x: 21, y: 100 },
          { x: 21, y: -100 },
          { x: -19, y: 100 },
          { x: -39, y: 0 },
          { x: 41, y: 0 },
          { x: -39, y: -20 },
          { x: 41, y: 20 },
          { x: 41, y: -20 },
          { x: -39, y: 20 },
          { x: -39, y: -40 },
          { x: 41, y: 40 },
          { x: 41, y: -40 },
          { x: -39, y: 40 },
          { x: -39, y: -60 },
          { x: 41, y: 60 },
          { x: 41, y: -60 },
          { x: -39, y: 60 },
          { x: -39, y: -80 },
          { x: 41, y: 80 },
          { x: 41, y: -80 },
          { x: -39, y: 80 },
          { x: -39, y: -100 },
          { x: 41, y: 100 },
          { x: 41, y: -100 },
          { x: -39, y: 100 },
          { x: -59, y: 0 },
          { x: 61, y: 0 },
          { x: -59, y: -20 },
          { x: 61, y: 20 },
          { x: 61, y: -20 },
          { x: -59, y: 20 },
          { x: -59, y: -40 },
          { x: 61, y: 40 },
          { x: 61, y: -40 },
          { x: -59, y: 40 },
          { x: -59, y: -60 },
          { x: 61, y: 60 },
          { x: 61, y: -60 },
          { x: -59, y: 60 },
          { x: -59, y: -80 },
          { x: 61, y: 80 },
          { x: 61, y: -80 },
          { x: -59, y: 80 },
          { x: -59, y: -100 },
          { x: 61, y: 100 },
          { x: 61, y: -100 },
          { x: -59, y: 100 },
          { x: -79, y: 0 },
          { x: 81, y: 0 },
          { x: -79, y: -20 },
          { x: 81, y: 20 },
          { x: 81, y: -20 },
          { x: -79, y: 20 },
          { x: -79, y: -40 },
          { x: 81, y: 40 },
          { x: 81, y: -40 },
          { x: -79, y: 40 },
          { x: -79, y: -60 },
          { x: 81, y: 60 },
          { x: 81, y: -60 },
          { x: -79, y: 60 },
          { x: -79, y: -80 },
          { x: 81, y: 80 },
          { x: 81, y: -80 },
          { x: -79, y: 80 },
          { x: -79, y: -100 },
          { x: 81, y: 100 },
          { x: 81, y: -100 },
          { x: -79, y: 100 },
          { x: -99, y: 0 },
          { x: 101, y: 0 },
          { x: -99, y: -20 },
          { x: 101, y: 20 },
          { x: 101, y: -20 },
          { x: -99, y: 20 },
          { x: -99, y: -40 },
          { x: 101, y: 40 },
          { x: 101, y: -40 },
          { x: -99, y: 40 },
          { x: -99, y: -60 },
          { x: 101, y: 60 },
          { x: 101, y: -60 },
          { x: -99, y: 60 },
          { x: -99, y: -80 },
          { x: 101, y: 80 },
          { x: 101, y: -80 },
          { x: -99, y: 80 },
          { x: -99, y: -100 },
          { x: 101, y: 100 },
          { x: 101, y: -100 },
          { x: -99, y: 100 }
        ];
        expect(snapLines?.length).toEqual(120);
        expect(snapLines).toEqual(expectedSnapLines);
      }
    });

    it('getGuides gets box of 80 positions sorted with offsets', () => {
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];

        const guides = piece?.getGuides();
        expect(guides?.length).toEqual(120);

        expect(guides![0]).toEqual({
          position: { x: 1, y: -20 },
          offset: 20
        });
        expect(guides![guides!.length - 1]).toEqual({
          position: { x: -99, y: 100 },
          offset: 100
        });
      }
    });
  });
});
