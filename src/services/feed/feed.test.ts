import { expect, test } from '@jest/globals';
import { ordersSlice } from './slice';
//import * as actions from './action';

// Mock экшена
jest.mock('./action', () => ({
  fetchOrdersAll: {
    pending: { type: 'ordersAll/fetchOrdersAll/pending' },
    fulfilled: { type: 'ordersAll/fetchOrdersAll/fulfilled' },
    rejected: { type: 'ordersAll/fetchOrdersAll/rejected' }
  }
}));

describe('[ordersSlice] Проверка экшена слайса', () => {
  test('Проверяем fetchOrdersAll.pending', () => {
    const initialState = ordersSlice.getInitialState();

    const newState = ordersSlice.reducer(initialState, {
      type: 'ordersAll/fetchOrdersAll/pending'
    });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.orders).toEqual([]);
  });

  test('Проверяем fetchOrdersAll.fulfilled', () => {
    const orders = [{ _id: '1', number: 123, status: 'done' }]; //якобы массив заказов с сервера

    const newState = ordersSlice.reducer(
      { orders: [], isLoading: true, error: null },
      {
        type: 'ordersAll/fetchOrdersAll/fulfilled',
        payload: { orders, total: 1, totalToday: 1 }
      }
    );

    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual(orders);
    expect(newState.error).toBeNull();
  });

  test('Проверяем fetchOrdersAll.rejected', () => {
    const newState = ordersSlice.reducer(
      { orders: [], isLoading: true, error: null },
      {
        type: 'ordersAll/fetchOrdersAll/rejected',
        payload: 'error'
      }
    );

    expect(newState.orders).toEqual([]);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('error');
  });
});
