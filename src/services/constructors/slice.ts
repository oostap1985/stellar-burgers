import { TIngredient } from '../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TConstructorIngredient = TIngredient & { id: string };

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[]; //TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push({
        ...action.payload,
        id: crypto.randomUUID()
      });
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item._id === action.payload
      );
      // Создаем копию массива
      const newIngredients = [...state.ingredients];
      // Меняем местами текущий элемент с предыдущим
      [newIngredients[index - 1], newIngredients[index]] = [
        newIngredients[index],
        newIngredients[index - 1]
      ];
      // Обновляем state
      state.ingredients = newIngredients;
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item._id === action.payload
      );
      // Создаем копию массива
      const newIngredients = [...state.ingredients];
      // Меняем местами текущий элемент с предыдущим
      [newIngredients[index], newIngredients[index + 1]] = [
        newIngredients[index + 1],
        newIngredients[index]
      ];
      // Обновляем state
      state.ingredients = newIngredients;
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun,
    getState: (state) => ({
      bun: state.bun
        ? {
            price: state.bun.price,
            _id: state.bun._id,
            name: state.bun.name,
            image: state.bun.image
          }
        : null,
      ingredients: state.ingredients
    })
  }
});

export const {
  addBun,
  addIngredient,
  clearConstructor,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;
export const { getIngredients, getBun, getState } = constructorSlice.selectors;

//export const selectConstructor = (state: RootState) => state.constructor;

export default constructorSlice.reducer;
