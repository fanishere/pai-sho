import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Game, { GameProps } from './Game';
import toJson from 'enzyme-to-json';
import 'jest-canvas-mock';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { GameState } from '../store/types';

describe('Mounted tests', () => {
  let wrapper: ReactWrapper;
  let game: ReactWrapper<GameProps>;
  const initialGameState: GameState = {
    piecePositions: [],
    guidesVisible: []
  };

  beforeEach(() => {
    const middlewares: any = [];
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialGameState);

    wrapper = mount(
      <Provider store={store}>
        <Game height={300} width={300} radius={300} gridCount={18} />
      </Provider>
    );
    game = wrapper.find(Game);
  });

  describe('Test render', () => {
    it('renders Game with props', () => {
      expect(game).toHaveLength(1);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders with the props set', () => {
      expect(game.props().height).toEqual(300);
      expect(game.props().width).toEqual(300);
      expect(game.props().radius).toEqual(300);
      expect(game.props().gridCount).toEqual(18);
    });

    it('renders with 0 guides showing', () => {
      expect(game).toHaveLength(1);
    });
  });
});
