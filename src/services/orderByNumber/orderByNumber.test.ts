import { expect, test } from '@jest/globals';
import { orderByNumberSlice } from './slice';
import type { TOrder } from '../../utils/types';

jest.mock('./action', () => ({
  fetchOrderByNumber: {
    pending: { type: 'orderByNumber/fetchOrderByNumber/pending' },
    fulfilled: { type: 'orderByNumber/fetchOrderByNumber/fulfilled' },
    rejected: { type: 'orderByNumber/fetchOrderByNumber/rejected' }
  }
}));

describe('[orderByNumberSlice] Проверка экшена fetchOrderByNumber', () => {
  const mockOrders = [
    {
      _id: '123',
      number: 4567,
      status: 'done',
      name: 'Space burger',
      ingredients: ['ing1', 'ing2'],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    } as TOrder
  ];

  test('Проверяем fetchOrderByNumber.pending', () => {
    const initialState = orderByNumberSlice.getInitialState();

    const newState = orderByNumberSlice.reducer(initialState, {
      type: 'orderByNumber/fetchOrderByNumber/pending'
    });

    expect(newState.loading).toBe(true); // loading становится true
    expect(newState.currentOrder).toEqual([]); // currentOrder остается пустым
  });

  test('Проверяем fetchOrderByNumber.fulfilled', () => {
    const newState = orderByNumberSlice.reducer(
      { currentOrder: [], loading: true }, // начальное состояние
      {
        type: 'orderByNumber/fetchOrderByNumber/fulfilled',
        payload: mockOrders // payload содержит массив заказов
      }
    );

    expect(newState.loading).toBe(false); // loading становится false
    expect(newState.currentOrder).toEqual(mockOrders); // currentOrder обновляется
    expect(newState.currentOrder).toHaveLength(1); // проверяем количество
  });

  test('Проверяем fetchOrderByNumber.rejected', () => {
    const newState = orderByNumberSlice.reducer(
      { currentOrder: [], loading: true },
      {
        type: 'orderByNumber/fetchOrderByNumber/rejected'
        // payload не используется в редьюсере
      }
    );

    expect(newState.loading).toBe(false); // loading становится false
    expect(newState.currentOrder).toEqual([]); // currentOrder остается пустым
  });
});
