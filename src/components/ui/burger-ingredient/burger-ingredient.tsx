import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;

    return (
      <li className={styles.container}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
          data-testid-cy='ingredient-item' // добавил
          data-ingredient-type-cy={`ingredient-${ingredient.type}`} // добавил
          data-ingredient-id-cy={ingredient._id} // добавил
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        {/* обернул кнопку в div, создал data-cy, чтобы найти кнопку и передал клик по ней. С компонента AddButton клик убрал. 
        Скорее всего так делать нельзя, просто не смог в сам компонент AddButton передать дополнительный атрибут data-cy*/}
        <div data-cy={`addIngredient-${ingredient._id}`} onClick={handleAdd}>
          <AddButton text='Добавить' extraClass={`${styles.addButton} mt-8`} />
        </div>
      </li>
    );
  }
);
