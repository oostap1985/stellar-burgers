import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
