import { configureStore, combineSlices } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from './ingredients/slice';
import { constructorSlice } from './constructors/slice';
import { ordersSlice } from './feed/slice';
import { userSlice } from './user/slice';
import { orderSlice } from './order/slice';
import { ordersUserSlice } from './ordersUser/slice';
import { orderByNumberSlice } from './orderByNumber/slice';

// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  ordersSlice,
  userSlice,
  orderSlice,
  ordersUserSlice,
  orderByNumberSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
