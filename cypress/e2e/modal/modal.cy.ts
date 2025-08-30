describe('Модальные окна ингредиентов', () => {
  beforeEach(() => {
    // Мокаем запрос ингредиентов
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'constructor/ingredients.json'
    }).as('getIngredients');

    // Посещаем главную страницу
    cy.visit('http://localhost:4000');

    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
  });

  it('Должен открывать модальное окно при клике на ингредиент', () => {
    // Кликаем на ингредиент
    cy.get('[data-ingredient-id-cy="643d69a5c3f7b9001cfa093c"]').click();

    // Проверяем что модальное окно открылось
    cy.get('[data-testid-cy="modal"]').should('be.visible');

    // Проверяем содержимое модального окна
    cy.get('[data-testid-cy="modal"]')
      .should('contain', 'Краторная булка N-200i')
      .should('contain', 'Калории')
      .should('contain', 'Белки')
      .should('contain', 'Жиры')
      .should('contain', 'Углеводы');

    // Проверяем что есть кнопка закрытия
    cy.get('[data-testid-cy="modal-close"]').should('be.visible');
  });

  it('Должен закрывать модальное окно по клику на крестик', () => {
    // Открываем модальное окно
    cy.get('[data-ingredient-id-cy="643d69a5c3f7b9001cfa093c"]').click();
    cy.get('[data-testid-cy="modal"]').should('be.visible');

    // Закрываем по клику на крестик
    cy.get('[data-testid-cy="modal-close"]').click();

    // Проверяем что модальное окно закрылось
    cy.get('[data-testid-cy="modal"]').should('not.exist');
  });

  it('Должен закрывать модальное окно по клику на оверлей', () => {
    // Открываем модальное окно
    cy.get('[data-ingredient-id-cy="643d69a5c3f7b9001cfa093c"]').click();
    cy.get('[data-testid-cy="modal"]').should('be.visible');

    // Закрываем по клику на оверлей (используем force: true)
    cy.get('[data-testid-cy="modal-overlay"]').click({ force: true });

    // Проверяем что модальное окно закрылось
    cy.get('[data-testid-cy="modal"]').should('not.exist');
  });
});
