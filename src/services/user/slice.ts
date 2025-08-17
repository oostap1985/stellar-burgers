import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  loginUser,
  logoutUser,
  setIsAuthChecked,
  registerUser,
  updateUser
} from './action';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
    // setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
    //   state.isAuthChecked = action.payload;
    // }
  },
  selectors: {
    getUser: (state) => {
      const userState = state.user;
      return userState;
    },
    getIsAuthChecked: (state) => {
      const isAuthCheckedState = state.isAuthChecked;
      return isAuthCheckedState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        //state.isAuthChecked = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.user = null;
        console.error('Update failed:', action.payload);
      })
      .addCase(setIsAuthChecked, (state, action) => {
        state.isAuthChecked = action.payload;
      });
  }
});

export const { setUser } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;
