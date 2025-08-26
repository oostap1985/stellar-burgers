import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import { logoutUser } from '../../services/user/action';
import { checkUserAuth } from '../../services/user/action';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  // useEffect(() => {
  //   dispatch(checkUserAuth());
  // });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
