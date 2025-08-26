import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';

export const fetchOrdersUser = createAsyncThunk(
  'ordersUser/fetchOrdersUser',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);
