import * as React from 'react';
import {mount, ReactWrapper, shallow, ShallowWrapper} from 'enzyme';
import Game from './Game';
import toJson from 'enzyme-to-json';
import 'jest-canvas-mock';
import {Piece} from "./Piece";
import {PieceGuide} from "./types";


describe('Mounted tests', () => {
    let instance: App;
    let wrapper: ReactWrapper;
    class App extends React.Component {
        game: Game | null | undefined;

        render() {
            return (
                <Game
                    height={300}
                    width={300}
                    radius={300}
                    gridCount={18}
                    ref={(node) => (this.game = node)}
                ></Game>
            );
        }
    }

    beforeEach(() => {
        wrapper = mount(<App />);
        instance = wrapper.instance() as App;
    });

    describe('Test render', () => {
        it('renders Game with props', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('renders with the props set', () => {
            const game = instance.game;
            expect(game?.props.height).toEqual(300);
            expect(game?.props.width).toEqual(300);
            expect(game?.props.radius).toEqual(300);
            expect(game?.props.gridCount).toEqual(18);
        });

        it('renders with the default state', () => {
            const game = instance.game;
            expect(game?.state.guidesVisible).toEqual([]);
            expect(game?.state.piecePositions).toEqual({
                "first": {position: {x:0, y:0}}
            });
        });
    });

    describe('Test clipFunc', () => {
        let game: Game | null | undefined;
        let ctx: CanvasRenderingContext2D | null;

        beforeEach(() => {
            game = instance.game;
            ctx = document.createElement('canvas').getContext('2d');
        });

        it('does not error', () => {
            expect(() => game?.clipFunc(ctx!)).not.toThrow();
        });

        it('snapshot path', () => {
            game?.clipFunc(ctx!);

            const path = ctx?.__getPath();
            expect(path).toMatchSnapshot();
        });

        it('snapshot clipping region', () => {
            game?.clipFunc(ctx!);
            const region = ctx?.__getClippingRegion();
            expect(region).toMatchSnapshot();
        });
    });
});

describe('Shallow tests', () => {
    let game: Game;
    let wrapper: ShallowWrapper;
    let piece: Piece;


    beforeEach(() => {
        wrapper = shallow(<Game
            height={300}
            width={300}
            radius={300}
            gridCount={18}
        />);
        game = wrapper.instance() as Game;

        let pieceWrapper = shallow(<Piece
            key={0}
            name={"test piece"}
            position={{x:0, y:0}}
            onDragMove={jest.fn()}
            onDragEnd={jest.fn()}
            gridWidth={15}
        />);
        piece = pieceWrapper.instance() as Piece;
    });

    describe('Test handlePieceMoving', () => {
        it('0 guides returned', () => {
            let guides: PieceGuide[] = []
            piece.getGuides = jest.fn().mockReturnValue(guides)
            game.handlePieceMoving(piece);
            expect(game?.state.guidesVisible).toEqual(guides);
        });
        it('one guide returned', () => {
            let guides = [
                {
                    position: {x:0, y:0},
                    offset: 10,
                }
            ]
            piece.getGuides = jest.fn().mockReturnValue(guides)
            game.handlePieceMoving(piece);
            expect(game?.state.guidesVisible).toEqual(guides);
        });
        it('three guides returned', () => {
            let guides = [
                {
                    position: {x:0, y:0},
                    offset: 10,
                },
                {
                    position: {x:0, y:30},
                    offset: 10,
                },
                {
                    position: {x:30, y:60},
                    offset: 10,
                }
            ]
            piece.getGuides = jest.fn().mockReturnValue(guides)
            game.handlePieceMoving(piece);
            expect(game?.state.guidesVisible).toEqual(guides);
        });
    });

    describe('Test handlePieceMoved', () => {
        it('0 guides returned', () => {
            let guides: PieceGuide[] = []
            piece.getGuides = jest.fn().mockReturnValue(guides)
            expect(() => game.handlePieceMoved(piece)).not.toThrow();
            expect(game.state.guidesVisible).toEqual([]);
            expect(game.state.piecePositions).toEqual({
                "first": {position: {x:0, y:0}}
            });
        });
        it('one guide returned', () => {
            let guides: PieceGuide[] = [
                {
                    position: {x:20, y:20},
                    offset: 10,
                }
            ]
            piece.getGuides = jest.fn().mockReturnValue(guides)
            expect(() => game.handlePieceMoved(piece)).not.toThrow();
            expect(game.state.guidesVisible).toEqual([]);
            expect(game.state.piecePositions).toEqual({
                "first": {position: {x:0, y:0}},
                "test piece": {position: {x:20, y:20}}
            });
        });
        it('three guide returned', () => {
            let guides: PieceGuide[] = [
                {
                    position: {x:20, y:20},
                    offset: 10,
                },
                {
                    position: {x:40, y:40},
                    offset: 30,
                },
                {
                    position: {x:60, y:60},
                    offset: 50,
                }
            ]
            piece.getGuides = jest.fn().mockReturnValue(guides)
            expect(() => game.handlePieceMoved(piece)).not.toThrow();
            expect(game.state.guidesVisible).toEqual([]);
            expect(game.state.piecePositions).toEqual({
                "first": {position: {x:0, y:0}},
                "test piece": {position: {x:20, y:20}}
            });
        });
    });
});

// TODO: test isVisible
