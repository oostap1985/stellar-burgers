import { expect, test } from '@jest/globals';
import { ingredientsSlice } from './slice';

jest.mock('./action', () => ({
  fetchIngredients: {
    pending: { type: 'ingredients/fetchIngredients/pending' },
    fulfilled: { type: 'ingredients/fetchIngredients/fulfilled' },
    rejected: { type: 'ingredients/fetchIngredients/rejected' }
  }
}));

describe('[ingredientsSlice] Проверка экшена fetchIngredients', () => {
  const initialState = ingredientsSlice.getInitialState();

  const mockIngredients = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 80,
      fat: 40,
      carbohydrates: 100,
      calories: 500,
      price: 200,
      image: 'image1.jpg',
      image_mobile: 'image1-mobile.jpg',
      image_large: 'image1-large.jpg'
    },
    {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      proteins: 50,
      fat: 30,
      carbohydrates: 10,
      calories: 250,
      price: 100,
      image: 'image2.jpg',
      image_mobile: 'image2-mobile.jpg',
      image_large: 'image2-large.jpg'
    }
  ];

  test('Проверяем fetchIngredients.pending', () => {
    const newState = ingredientsSlice.reducer(initialState, {
      type: 'ingredients/fetchIngredients/pending'
    });

    expect(newState.status).toBe(false); // status становится false
    expect(newState.ingredients).toEqual([]); // ingredients остаются пустыми
  });

  test('Проверяем fetchIngredients.fulfilled', () => {
    const newState = ingredientsSlice.reducer(
      initialState, // начальное состояние
      {
        type: 'ingredients/fetchIngredients/fulfilled',
        payload: mockIngredients // payload содержит массив ингредиентов
      }
    );

    expect(newState.status).toBe(true); // status становится true
    expect(newState.ingredients).toEqual(mockIngredients); // ingredients обновляются
    expect(newState.ingredients).toHaveLength(2); // проверяем количество
  });

  test('Проверяем fetchIngredients.rejected', () => {
    const newState = ingredientsSlice.reducer(initialState, {
      type: 'ingredients/fetchIngredients/rejected'
    });

    expect(newState.status).toBe(false); // status остается false
    expect(newState.ingredients).toEqual([]); // ingredients остаются пустыми
  });
});
