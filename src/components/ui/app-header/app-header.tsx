import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import { useLocation, useNavigate } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRouteActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <div
            className={`${styles.link} ${isRouteActive('/') ? styles.link_active : ''} ${styles.menu_item}`}
            onClick={() => navigate('/')}
          >
            <BurgerIcon type={isRouteActive('/') ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </div>
          <div
            className={`${styles.link} ${isRouteActive('/feed') ? styles.link_active : ''} ${styles.menu_item}`}
            onClick={() => navigate('/feed')}
          >
            <ListIcon type={isRouteActive('/feed') ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </div>
        </div>
        <div
          className={`${styles.logo} ${styles.menu_item}`}
          onClick={() => navigate('/')}
        >
          <Logo className='' />
        </div>
        <div
          className={`${styles.link} ${isRouteActive('/profile') ? styles.link_active : ''} ${styles.link_position_last} ${styles.menu_item}`}
          onClick={() => navigate('/profile')}
        >
          <ProfileIcon
            type={isRouteActive('/profile') ? 'primary' : 'secondary'}
          />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </nav>
    </header>
  );
};
