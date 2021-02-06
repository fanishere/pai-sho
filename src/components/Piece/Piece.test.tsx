/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { Piece, PieceProps } from './Piece';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { GameState } from '../../store/types';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import rose from '../../assets/rose.svg';

describe('Mounted tests', () => {
  let wrapper: ReactWrapper;
  let piece: ReactWrapper<PieceProps>;
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
        <Piece
          name={'rose'}
          gridWidth={20}
          side={'red'}
          imgSrc={rose}
          spaces={3}
          position={{ x: 1, y: 0 }}
        />
      </Provider>
    );
    piece = wrapper.find(Piece);
  });

  describe('Test render', () => {
    it('renders piece with props', () => {
      expect(piece).toMatchSnapshot();
    });

    it('renders with the props set', () => {
      expect(piece.props().gridWidth).toEqual(20);
      expect(piece.props().position).toEqual({ x: 1, y: 0 });
      expect(piece.props().name).toEqual('rose');
    });
  });
});
