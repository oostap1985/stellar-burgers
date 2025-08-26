import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrdersAll } from '../../services/feed/action';
import { getOrders, getOrdersLoading } from '../../services/feed/slice';
// навести красоту и убрать лишнее
export const Feed: FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getOrdersLoading);
  //const error = useSelector(getOrdersError);

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(fetchOrdersAll());
  }, [dispatch]);

  const orders = useSelector(getOrders);
  console.log(orders);
  const handleGetFeeds = () => {
    dispatch(fetchOrdersAll());
  };

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  if (orders.length) {
    return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
  }
};
