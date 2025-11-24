import { expect, test } from '@jest/globals';
import { ordersUserSlice } from './slice';
import type { TOrder } from '../../utils/types';

jest.mock('./action', () => ({
  fetchOrdersUser: {
    pending: { type: 'ordersUser/fetchOrdersUser/pending' },
    fulfilled: { type: 'ordersUser/fetchOrdersUser/fulfilled' },
    rejected: { type: 'ordersUser/fetchOrdersUser/rejected' }
  }
}));

describe('[ordersUserSlice] Проверка экшена fetchOrdersUser', () => {
  const mockOrders = [
    {
      _id: '1',
      number: 1234,
      status: 'done',
      name: 'Space burger',
      ingredients: ['ing1', 'ing2'],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    } as TOrder,
    {
      _id: '2',
      number: 1235,
      status: 'pending',
      name: 'Galaxy burger',
      ingredients: ['ing3', 'ing4'],
      createdAt: '2023-01-02',
      updatedAt: '2023-01-02'
    } as TOrder
  ];

  test('Проверяем fetchOrdersUser.pending', () => {
    const initialState = ordersUserSlice.getInitialState();

    const newState = ordersUserSlice.reducer(initialState, {
      type: 'ordersUser/fetchOrdersUser/pending'
    });

    expect(newState.loading).toBe(true); // loading становится true
    expect(newState.orders).toEqual([]); // orders остается пустым
  });

  test('Проверяем fetchOrdersUser.fulfilled', () => {
    const newState = ordersUserSlice.reducer(
      { orders: [], loading: true }, // начальное состояние
      {
        type: 'ordersUser/fetchOrdersUser/fulfilled',
        payload: mockOrders // payload содержит массив заказов
      }
    );

    expect(newState.loading).toBe(false); // loading становится false
    expect(newState.orders).toEqual(mockOrders); // orders обновляется
    expect(newState.orders).toHaveLength(2); // проверяем количество
  });

  test('Проверяем fetchOrdersUser.rejected', () => {
    const newState = ordersUserSlice.reducer(
      { orders: [], loading: true },
      {
        type: 'ordersUser/fetchOrdersUser/rejected'
        // payload не используется в редьюсере
      }
    );

    expect(newState.loading).toBe(false); // loading становится false
    expect(newState.orders).toEqual([]); // orders остается пустым
  });
});
