import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { fetchIngredients } from './action';

//type TStatus = 'loading' | 'success' | 'failed';

type TIngredients = {
  ingredients: TIngredient[];
  status: boolean;
};

export const initialState: TIngredients = {
  ingredients: [],
  status: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getStatus: (state) => state.status,
    getBuns: (state) => {
      const buns = state.ingredients.filter((item) => item.type === 'bun');
      return buns;
    },
    getMains: (state) => {
      const mains = state.ingredients.filter((item) => item.type === 'main');
      return mains;
    },
    getSauces: (state) => {
      const sauces = state.ingredients.filter((item) => item.type === 'sauce');
      return sauces;
    },
    getIngredientById: (state) => (id: string) => {
      const ingId = state.ingredients.find((ing) => ing._id === id);
      return ingId;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.status = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.status = false;
      });
  }
});

export default ingredientsSlice.reducer;

export const { setIngredients } = ingredientsSlice.actions;
export const {
  getIngredients,
  getStatus,
  getBuns,
  getMains,
  getSauces,
  getIngredientById
} = ingredientsSlice.selectors;
