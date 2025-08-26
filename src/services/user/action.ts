import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import {
  registerUserApi,
  TRegisterData,
  TLoginData,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  logoutApi,
  refreshToken,
  updateUserApi
} from '../../utils/burger-api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from './slice';

export const setIsAuthChecked = createAction<boolean, 'user/setIsAuthChecked'>(
  'user/setIsAuthChecked'
);

function isTokenExists() {
  return !!getCookie('accessToken'); //localStorage.getItem('accessToken')
}

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      getUserApi()
        .then((user) => {
          //console.log(`AAAAAAAAAAAAAAAAAAAAA ${user.user}`);
          dispatch(setUser(user.user));
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

// Экшен регистрации пользователя
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    return response;
  }
);

// получение токинов по логину и паролю (авторизация)
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    return response;
  }
);

// выход из системы (удаление данных юзера)
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const response = await logoutApi();
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  deleteCookie('accessToken');
  return response;
});

// обновление данных пользователя
export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>) => {
    const response = await updateUserApi(userData);
    return response.user; // Возвращаем обновленные данные пользователя
  }
);

// // запрос на сброс пароля
// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (data: { email: string }) => {
//     const response = await forgotPasswordApi(data);
//     return response;
//   }
// );

// // смена пароля по токену
// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (data: { password: string; token: string }) => {
//     const response = await resetPasswordApi(data);
//     return response;
//   }
// );

// //получение юзера (пока ????????????)
// export const getUser = createAsyncThunk('auth/user', async () => {
//   const response = getUserApi(); // функция была с  await
//   return response;
// });
