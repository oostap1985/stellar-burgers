import { TEST_URL } from '../../constants';
import { SELECTORS, getIngredientSelector } from '../../constants';

describe('Модальные окна ингредиентов', () => {
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

  it('Должен открывать модальное окно при клике на ингредиент', () => {
    // Кликаем на ингредиент
    cy.get(getIngredientSelector('643d69a5c3f7b9001cfa093c')).click();

    // Проверяем что модальное окно открылось
    cy.get(SELECTORS.MODAL).should('be.visible');

    // Проверяем содержимое модального окна
    cy.get(SELECTORS.MODAL)
      .should('contain', 'Краторная булка N-200i')
      .should('contain', 'Калории')
      .should('contain', 'Белки')
      .should('contain', 'Жиры')
      .should('contain', 'Углеводы');

    // Проверяем что есть кнопка закрытия
    cy.get(SELECTORS.MODAL_CLOSE).should('be.visible');
  });

  it('Должен закрывать модальное окно по клику на крестик', () => {
    // Открываем модальное окно
    cy.get(getIngredientSelector('643d69a5c3f7b9001cfa093c')).click();
    cy.get(SELECTORS.MODAL).should('be.visible');

    // Закрываем по клику на крестик
    cy.get(SELECTORS.MODAL_CLOSE).click();

    // Проверяем что модальное окно закрылось
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('Должен закрывать модальное окно по клику на оверлей', () => {
    // Открываем модальное окно
    cy.get(getIngredientSelector('643d69a5c3f7b9001cfa093c')).click();
    cy.get(SELECTORS.MODAL).should('be.visible');

    // Закрываем по клику на оверлей (используем force: true)
    cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });

    // Проверяем что модальное окно закрылось
    cy.get(SELECTORS.MODAL).should('not.exist');
  });
});
