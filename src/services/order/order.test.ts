import { expect, test } from '@jest/globals';
import { orderSlice } from './slice';
import type { TOrder } from '../../utils/types';

jest.mock('./action', () => ({
  createOrder: {
    pending: { type: 'order/createOrder/pending' },
    fulfilled: { type: 'order/createOrder/fulfilled' },
    rejected: { type: 'order/createOrder/rejected' }
  }
}));

// Импортируем после мока
// import { orderSlice } from './slice';

describe('[orderSlice] Проверка экшена createOrder', () => {
  const mockOrderResponse = {
    order: {
      _id: '123',
      number: 4567,
      status: 'done',
      name: 'Space burger',
      ingredients: ['ing1', 'ing2'],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    } as TOrder,
    name: 'Space burger'
  };

  const initialState = orderSlice.getInitialState();

  test('Проверяем createOrder.pending', () => {
    const newState = orderSlice.reducer(initialState, {
      type: 'order/createOrder/pending'
    });

    expect(newState.isLoad).toBe(false); // isLoad становится false
    expect(newState.order).toBeNull(); // order остается null
    expect(newState.name).toBe(''); // name остается пустой строкой
  });

  test('Проверяем createOrder.fulfilled', () => {
    const newState = orderSlice.reducer(
      initialState, // начальное состояние
      {
        type: 'order/createOrder/fulfilled',
        payload: mockOrderResponse // payload содержит order и name
      }
    );

    expect(newState.isLoad).toBe(true); // isLoad становится true
    expect(newState.order).toEqual(mockOrderResponse.order); // order обновляется
    expect(newState.name).toBe(mockOrderResponse.name); // name обновляется
    //expect(newState.order?.number).toBe(4567); // проверяем конкретное поле
  });

  test('Проверяем createOrder.rejected', () => {
    const newState = orderSlice.reducer(initialState, {
      type: 'order/createOrder/rejected'
    });

    expect(newState.isLoad).toBe(false); // isLoad становится false
    expect(newState.order).toBeNull(); // order остается null
    expect(newState.name).toBe(''); // name остается пустой строкой
  });
});
