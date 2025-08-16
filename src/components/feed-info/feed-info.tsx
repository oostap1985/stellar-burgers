import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getOrdersLoading,
  getOrdersError
} from '../../services/feed/slice';

const getOrderss = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  //const dispatch = useDispatch();
  const orders = useSelector(getOrders);

  // const isLoading = useSelector(getOrdersLoading);
  // const error = useSelector(getOrdersError);

  /** TODO: взять переменные из стора */
  //const orders: TOrder[] = [];
  //const feed = {};
  const feed = {
    total: orders.length,
    totalToday: orders.filter(
      (order) =>
        new Date(order.createdAt).toDateString() === new Date().toDateString()
    ).length
  };

  const readyOrders = getOrderss(orders, 'done');

  const pendingOrders = getOrderss(orders, 'pending');

  // if (isLoading) return <div>Загрузка...</div>;
  // if (error) return <div>Ошибка: {error}</div>;
  // if (!orders.length) return <div>Нет данных о заказах</div>;

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
