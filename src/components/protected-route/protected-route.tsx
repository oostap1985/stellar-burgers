import React from 'react';
import { useSelector } from '../../services/store';
import { getUser, getIsAuthChecked } from '../../services/user/slice';
import { useLocation, Navigate } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedProps): React.JSX.Element => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    //для авторизованного, но не авторизован
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    //для неавторизованного и авторизован
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected onlyUnAuth component={component} />;
