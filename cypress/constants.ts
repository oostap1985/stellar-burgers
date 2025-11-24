export const TEST_URL = 'http://localhost:4000';

export const SELECTORS = {
  // Ингредиенты
  INGREDIENT_ITEM: '[data-testid-cy="ingredient-item"]',
  INGREDIENT_TYPE: 'data-ingredient-type-cy',
  INGREDIENT_ID: 'data-ingredient-id-cy',
  ADD_INGREDIENT_BUTTON: 'data-cy="addIngredient-',

  // Конструктор
  CONSTRUCTOR_ITEM: '[data-testid-cy="constructor-item"]',
  CONSTRUCTOR_BUN_TOP: '[data-testid-cy="constructor-bun-top"]',
  CONSTRUCTOR_BUN_BOTTOM: '[data-testid-cy="constructor-bun-bottom"]',
  NO_INGREDIENTS: '[data-testid-cy="no-ingredients"]',
  NO_BUN_TOP: '[data-testid-cy="no-bun-top"]',
  NO_BUN_BOTTOM: '[data-testid-cy="no-bun-bottom"]',
  TOTAL_PRICE: '[data-testid-cy="total-price"]',

  // Модальные окна
  MODAL: '[data-testid-cy="modal"]',
  MODAL_CLOSE: '[data-testid-cy="modal-close"]',
  MODAL_OVERLAY: '[data-testid-cy="modal-overlay"]',

  // Кнопки
  CREATE_ORDER_BUTTON: '[data-testid-cy="create-order-button"]'
};

// Функции для селекторов у которых может меняться id или type
export const getIngredientSelector = (id: string) =>
  `[${SELECTORS.INGREDIENT_ID}="${id}"]`;

export const getAddButtonSelector = (id: string) =>
  `[${SELECTORS.ADD_INGREDIENT_BUTTON}${id}"] > button`;

export const getIngredientTypeSelector = (type: string) =>
  `[${SELECTORS.INGREDIENT_TYPE}="ingredient-${type}"]`;
