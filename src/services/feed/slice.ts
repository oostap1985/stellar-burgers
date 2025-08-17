import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrdersAll } from './action';

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'ordersAll',
  initialState,
  reducers: {
    // setOrders: (state, action: PayloadAction<TOrder[]>) => {
    //   state.orders = action.payload;
    // }
  },
  selectors: {
    getOrders: (state) => {
      const orders = state.orders;
      return orders;
    },
    getOrdersLoading: (state) => state.isLoading,
    getOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrdersAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { getOrders, getOrdersLoading, getOrdersError } =
  ordersSlice.selectors;
export default ordersSlice.reducer;
