import * as React from "react";
import {mount, ReactWrapper} from "enzyme";
import Game from "./Game";
import toJson from 'enzyme-to-json';
import 'jest-canvas-mock';


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
            expect(game?.state.positionsVisible).toEqual([]);
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

    // TODO: test handlePieceMoving
    // TODO: test handlePieceMoved
    // TODO: test isVisible

});
