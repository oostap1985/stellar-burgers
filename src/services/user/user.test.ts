import { expect, test } from '@jest/globals';
import { userSlice } from './slice';
import type { TUser } from '../../utils/types';

jest.mock('./action', () => ({
  registerUser: {
    pending: { type: 'user/registerUser/pending' },
    fulfilled: { type: 'user/registerUser/fulfilled' },
    rejected: { type: 'user/registerUser/rejected' }
  },
  loginUser: {
    pending: { type: 'user/loginUser/pending' },
    fulfilled: { type: 'user/loginUser/fulfilled' },
    rejected: { type: 'user/loginUser/rejected' }
  },
  logoutUser: {
    pending: { type: 'user/logoutUser/pending' },
    fulfilled: { type: 'user/logoutUser/fulfilled' },
    rejected: { type: 'user/logoutUser/rejected' }
  },
  updateUser: {
    pending: { type: 'user/updateUser/pending' },
    fulfilled: { type: 'user/updateUser/fulfilled' },
    rejected: { type: 'user/updateUser/rejected' }
  },
  setIsAuthChecked: { type: 'user/setIsAuthChecked' }
}));

describe('[userSlice] Проверка экшенов', () => {
  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  // Тесты для registerUser
  describe('проверка registerUser', () => {
    const initialState = userSlice.getInitialState();

    test('registerUser.pending - устанавливает user в null', () => {
      const newState = userSlice.reducer(initialState, {
        type: 'user/registerUser/pending'
      });
      expect(newState.user).toBeNull();
    });

    test('registerUser.fulfilled - устанавливает user и isAuthChecked', () => {
      const newState = userSlice.reducer(initialState, {
        type: 'user/registerUser/fulfilled',
        payload: {
          user: mockUser,
          accessToken: 'token',
          refreshToken: 'refresh'
        }
      });
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
    });

    test('registerUser.rejected - устанавливает user в null', () => {
      const newState = userSlice.reducer(initialState, {
        type: 'user/registerUser/rejected'
      });
      expect(newState.user).toBeNull();
    });
  });

  // Тесты для loginUser
  describe('проверка loginUser', () => {
    const initialState = userSlice.getInitialState();

    test('loginUser.pending - устанавливает user в null', () => {
      const newState = userSlice.reducer(initialState, {
        type: 'user/loginUser/pending'
      });
      expect(newState.user).toBeNull();
    });

    test('loginUser.fulfilled - устанавливает user и isAuthChecked', () => {
      const newState = userSlice.reducer(initialState, {
        type: 'user/loginUser/fulfilled',
        payload: {
          user: mockUser,
          accessToken: 'token',
          refreshToken: 'refresh'
        }
      });
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
    });

    test('loginUser.rejected - устанавливает user в null', () => {
      const newState = userSlice.reducer(initialState, {
        type: 'user/loginUser/rejected'
      });
      expect(newState.user).toBeNull();
    });
  });

  // Тесты для logoutUser
  describe('проверка logoutUser', () => {
    test('logoutUser.pending - устанавливает user в null', () => {
      const initialState = { user: mockUser, isAuthChecked: true };
      const newState = userSlice.reducer(initialState, {
        type: 'user/logoutUser/pending'
      });
      expect(newState.user).toBeNull();
    });

    test('logoutUser.fulfilled - устанавливает user в null', () => {
      const initialState = { user: mockUser, isAuthChecked: true };
      const newState = userSlice.reducer(initialState, {
        type: 'user/logoutUser/fulfilled'
      });
      expect(newState.user).toBeNull();
    });

    test('logoutUser.rejected - устанавливает user в null', () => {
      const initialState = { user: mockUser, isAuthChecked: true };
      const newState = userSlice.reducer(initialState, {
        type: 'user/logoutUser/rejected'
      });
      expect(newState.user).toBeNull();
    });
  });

  // Тесты для updateUser
  describe('проверка updateUser', () => {
    test('updateUser.pending - устанавливает user в null', () => {
      const initialState = { user: mockUser, isAuthChecked: true };
      const newState = userSlice.reducer(initialState, {
        type: 'user/updateUser/pending'
      });
      expect(newState.user).toBeNull();
    });

    test('updateUser.fulfilled - обновляет user', () => {
      const updatedUser: TUser = {
        email: 'updated@example.com',
        name: 'Updated User'
      };
      const initialState = { user: mockUser, isAuthChecked: true };
      const newState = userSlice.reducer(initialState, {
        type: 'user/updateUser/fulfilled',
        payload: updatedUser
      });
      expect(newState.user).toEqual(updatedUser);
      //expect(newState.isAuthChecked).toBe(true); // не меняется
    });

    test('updateUser.rejected - устанавливает user в null', () => {
      const initialState = { user: mockUser, isAuthChecked: true };
      const newState = userSlice.reducer(initialState, {
        type: 'user/updateUser/rejected',
        payload: 'Update error'
      });
      expect(newState.user).toBeNull();
    });
  });

  // Тесты для setIsAuthChecked
  describe('setIsAuthChecked', () => {
    test('setIsAuthChecked - устанавливает isAuthChecked', () => {
      const initialState = { user: null, isAuthChecked: false };
      const newState = userSlice.reducer(initialState, {
        type: 'user/setIsAuthChecked',
        payload: true
      });
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toBeNull();
    });
  });
});
