import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { constructorSlice } from './constructors/slice'; //импортируем один слайс
import { expect, test } from '@jest/globals';

const rootReducer = combineSlices(constructorSlice);

describe('rootReducer', () => {
  test('Правильная инициализация rootReducer', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();

    // Проверяем наличие слайса в состоянии
    expect(state).toHaveProperty('constructorIngredients');

    // Проверяем начальное состояние слайса
    expect(state.constructorIngredients).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('Возвращает начальное состояние при undefined состоянии и неизвестном экшене', () => {
    // Вызываем rootReducer с undefined состоянием и неизвестным экшеном
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Проверяем что возвращается корректное начальное состояние
    expect(newState).toEqual({
      constructorIngredients: {
        bun: null,
        ingredients: []
      }
    });
  });
});
