import { TOrder } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder } from './action';

type TOrderState = {
  order: TOrder | null;
  name: string;
  isLoad: boolean;
};

const initialState: TOrderState = {
  order: null,
  name: '',
  isLoad: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.name = '';
    }
  },
  selectors: {
    getStateOrder: (state) => {
      const order = state;
      return order;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoad = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoad = true;
        state.order = action.payload.order;
        state.name = action.payload.name;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoad = false;
      });
  }
});

export const { getStateOrder } = orderSlice.selectors;
export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
