import { combineReducers } from 'redux';
import { piecesReducer } from './reducer';
import { configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  pieces: piecesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});
