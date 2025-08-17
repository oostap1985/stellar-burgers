import { FC, useMemo, useState, useEffect } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { getState, clearConstructor } from '../../services/constructors/slice';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/order/action';
import { getStateOrder, resetOrder } from '../../services/order/slice';
import { getIsAuthChecked, getUser } from '../../services/user/slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const constructorItems = useSelector(getState);
  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIsAuthenticated = useSelector(getUser);
  const { order, name, isLoad } = useSelector(getStateOrder);

  useEffect(() => {
    if (order && name) {
      setOrderModalData(order);
      setOrderRequest(false);
    }
  }, [order, name]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (userIsAuthenticated === null) {
      navigate('/login');
      return;
    }

    setOrderRequest(true);

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(orderData));
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
    setOrderRequest(false);
    dispatch(clearConstructor());
    dispatch(resetOrder());
    //navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
