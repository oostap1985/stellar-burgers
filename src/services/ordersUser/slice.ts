import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrdersUser } from './action';

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  loading: false
};

export const ordersUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {
    // setOrders: (state, action: PayloadAction<TOrder[]>) => {
    //   state.orders = action.payload;
    // }
  },
  selectors: {
    getOrdersUser: (state) => {
      const ordersUser = state.orders;
      return ordersUser;
    },
    getOrdersUserLoading: (state) => {
      const loadingOrders = state.loading;
      return loadingOrders;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersUser.rejected, (state, action) => {
        state.loading = false;
      });
    //   .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
    //     // Обработка данных отдельного заказа если нужно
    //   });
  }
});

export const { getOrdersUser, getOrdersUserLoading } =
  ordersUserSlice.selectors;
export default ordersUserSlice.reducer;
