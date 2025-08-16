import { TOrder } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrderByNumber } from './action';

type TOrderState = {
  currentOrder: TOrder[];
  loading: boolean;
};

const initialState: TOrderState = {
  currentOrder: [],
  loading: false
};

export const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = [];
    }
  },
  selectors: {
    getCurrentOrder: (state) => {
      const order = state.currentOrder[0];
      return order;
    },
    getLoading: (state) => {
      const load = state.loading;
      return load;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { getCurrentOrder, getLoading } = orderByNumberSlice.selectors;
export const { clearCurrentOrder } = orderByNumberSlice.actions;
export default orderByNumberSlice.reducer;
