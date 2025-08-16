import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
//import { TIngredient } from '../../utils/types';

export const fetchOrdersAll = createAsyncThunk('ordersAll/fetch', async () => {
  const response = await getFeedsApi();
  return response;
});
