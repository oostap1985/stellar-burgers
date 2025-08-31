import { TEST_URL } from '../../constants';
import {
  SELECTORS,
  getIngredientTypeSelector,
  getIngredientSelector,
  getAddButtonSelector
} from '../../constants';

describe('Конструктор бургеров', () => {
  beforeEach(() => {
    // // Мокаем запрос ингредиентов
    // cy.intercept('GET', 'api/ingredients', {
    //   fixture: 'constructor/ingredients.json'
    // }).as('getIngredients');
    // // Посещаем главную страницу
    // cy.visit(TEST_URL);
    // // Ждем загрузки ингредиентов
    // cy.wait('@getIngredients');
    cy.setupBurgerConstructor();
  });

  it('Должен отображать ингредиенты из моковых данных', () => {
    // Проверяем что ингредиенты загрузились
    cy.get(SELECTORS.INGREDIENT_ITEM).should('have.length', 15);

    // Проверяем отображение булок
    cy.get(getIngredientTypeSelector('bun')).should('have.length', 2);
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').should('exist');

    // Проверяем отображение начинок
    cy.get(getIngredientTypeSelector('main')).should('have.length', 9);
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');

    // Проверяем отображение соусов
    cy.get(getIngredientTypeSelector('sauce')).should('have.length', 4);
    cy.contains('Соус фирменный Space Sauce').should('exist');
  });

  it('Должен отображать правильные данные ингредиентов', () => {
    // Проверяем конкретные ингредиенты по их ID
    cy.get(getIngredientSelector('643d69a5c3f7b9001cfa093c'))
      .should('contain', 'Краторная булка N-200i')
      .should('contain', '1255');

    cy.get(getIngredientSelector('643d69a5c3f7b9001cfa0941'))
      .should('contain', 'Биокотлета из марсианской Магнолии')
      .should('contain', '424');

    cy.get(getIngredientSelector('643d69a5c3f7b9001cfa0942'))
      .should('contain', 'Соус Spicy-X')
      .should('contain', '90');
  });

  it('Должен добавлять начинку в конструктор', () => {
    // Проверяем что конструктор пустой
    //cy.get(SELECTORS.NO_INGREDIENTS).should('exist');
    cy.checkEmptyConstructor();

    // Кликаем на кнопку "Добавить" у начинки
    cy.get(getAddButtonSelector('643d69a5c3f7b9001cfa0941')).click();

    // Проверяем что ингредиент добавился в конструктор
    cy.get(SELECTORS.CONSTRUCTOR_ITEM)
      .should('have.length', 1)
      .should('contain', 'Биокотлета из марсианской Магнолии');

    // Проверяем что пропал плейсхолдер
    cy.get(SELECTORS.NO_INGREDIENTS).should('not.exist');

    // Проверяем обновление цены
    cy.get(SELECTORS.TOTAL_PRICE).should('contain', '424');
  });

  it('Должен добавлять булку в конструктор', () => {
    // Кликаем на кнопку "Добавить" у булки
    cy.get(getAddButtonSelector('643d69a5c3f7b9001cfa093c')).click();

    // Проверяем что булка добавилась в конструктор (верх и низ)
    cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should(
      'contain',
      'Краторная булка N-200i'
    );

    // Проверяем обновление цены (булка считается дважды)
    cy.get(SELECTORS.TOTAL_PRICE).should('contain', '2510'); // 1255 * 2
  });

  it('Должен добавлять соус в конструктор', () => {
    // Кликаем на кнопку "Добавить" у соуса
    cy.get(getAddButtonSelector('643d69a5c3f7b9001cfa0942')).click();

    // Проверяем что соус добавился в конструктор
    cy.get(SELECTORS.CONSTRUCTOR_ITEM)
      .should('have.length', 1)
      .should('contain', 'Соус Spicy-X');

    // Проверяем обновление цены
    cy.get(SELECTORS.TOTAL_PRICE).should('contain', '90');
  });
});
