import { constructorSlice } from './slice';
import { nanoid } from '@reduxjs/toolkit';
import { expect, test } from '@jest/globals';

// Моковые данные для тестирования
const mockIngredient1 = {
  _id: '1',
  name: 'Булка',
  type: 'bun' as const,
  proteins: 80,
  fat: 40,
  carbohydrates: 100,
  calories: 500,
  price: 200,
  image: 'image1.jpg',
  image_mobile: 'image1-mobile.jpg',
  image_large: 'image1-large.jpg',
  id: nanoid()
};

const mockIngredient2 = {
  _id: '2',
  name: 'Котлета',
  type: 'main' as const,
  proteins: 50,
  fat: 30,
  carbohydrates: 10,
  calories: 250,
  price: 100,
  image: 'image2.jpg',
  image_mobile: 'image2-mobile.jpg',
  image_large: 'image2-large.jpg',
  id: nanoid()
};

const mockIngredient3 = {
  _id: '3',
  name: 'Сыр',
  type: 'main' as const,
  proteins: 25,
  fat: 20,
  carbohydrates: 5,
  calories: 150,
  price: 50,
  image: 'image3.jpg',
  image_mobile: 'image3-mobile.jpg',
  image_large: 'image3-large.jpg',
  id: nanoid()
};

const mockMainIngredient = {
  _id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 50,
  fat: 30,
  carbohydrates: 10,
  calories: 250,
  price: 100,
  image: 'main-image.jpg',
  image_mobile: 'main-image-mobile.jpg',
  image_large: 'main-image-large.jpg'
};

describe('[constructorSlice] проверка редьюсеров слайса', () => {
  test('редьюсер removeIngredient, удаление ингредиента по id', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredient1, mockIngredient2, mockIngredient3]
    };

    // Удаляем второй ингредиент
    const newState = constructorSlice.reducer(
      initialState,
      constructorSlice.actions.removeIngredient(mockIngredient2.id)
    );

    expect(newState.ingredients).toHaveLength(2);
    expect(newState.ingredients).toEqual([mockIngredient1, mockIngredient3]);
    expect(newState.ingredients).not.toContainEqual(mockIngredient2);
  });

  test('редьюсер addIngredient, добавление ингредиента', () => {
    const initialState = constructorSlice.getInitialState();

    const newState = constructorSlice.reducer(
      initialState,
      constructorSlice.actions.addIngredient(mockMainIngredient)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({
      ...mockMainIngredient,
      id: expect.any(String) // id должен быть сгенерирован
    });
    expect(newState.ingredients[0].id).not.toBe(mockMainIngredient._id);
  });

  test('редьюсер moveIngredientUp, перемещение ингредиента вверх', () => {
    // Создаем состояние с тремя ингредиентами
    const initialState = {
      ...constructorSlice.getInitialState(),
      ingredients: [
        { ...mockIngredient1, id: 'id-1' },
        { ...mockIngredient2, id: 'id-2' },
        { ...mockIngredient3, id: 'id-3' }
      ]
    };

    // Перемещаем второй ингредиент (index 1) вверх
    const newState = constructorSlice.reducer(
      initialState,
      constructorSlice.actions.moveIngredientUp('id-2')
    );

    expect(newState.ingredients).toHaveLength(3);
    // Проверяем новый порядок: [ingredient2, ingredient1, ingredient3]
    expect(newState.ingredients[0].id).toBe('id-2');
    expect(newState.ingredients[1].id).toBe('id-1');
    expect(newState.ingredients[2].id).toBe('id-3');
  });

  test('редьюсер moveIngredientDown, перемещение ингредиента вниз', () => {
    const initialState = {
      ...constructorSlice.getInitialState(),
      ingredients: [
        { ...mockIngredient1, id: 'id-1' },
        { ...mockIngredient2, id: 'id-2' },
        { ...mockIngredient3, id: 'id-3' }
      ]
    };

    // Перемещаем первый ингредиент (index 0) вниз
    const newState = constructorSlice.reducer(
      initialState,
      constructorSlice.actions.moveIngredientDown('id-1')
    );

    expect(newState.ingredients).toHaveLength(3);
    // Проверяем новый порядок: [ingredient2, ingredient1, ingredient3]
    expect(newState.ingredients[0].id).toBe('id-2');
    expect(newState.ingredients[1].id).toBe('id-1');
    expect(newState.ingredients[2].id).toBe('id-3');
  });
});
