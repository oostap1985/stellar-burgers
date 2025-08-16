import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchOrdersUser } from '../../services/ordersUser/action';
import {
  getOrdersUser,
  getOrdersUserLoading
} from '../../services/ordersUser/slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = [];

  const dispatch = useDispatch();

  const isLoading = useSelector(getOrdersUserLoading);

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(fetchOrdersUser());
  }, [dispatch]);

  const orders = useSelector(getOrdersUser);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
