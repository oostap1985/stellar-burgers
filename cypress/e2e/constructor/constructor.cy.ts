describe('Конструктор бургеров', () => {
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

  it('Должен отображать ингредиенты из моковых данных', () => {
    // Проверяем что ингредиенты загрузились
    cy.get('[data-testid-cy="ingredient-item"]').should('have.length', 15);

    // Проверяем отображение булок
    cy.get('[data-ingredient-type-cy="ingredient-bun"]').should(
      'have.length',
      2
    );
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').should('exist');

    // Проверяем отображение начинок
    cy.get('[data-ingredient-type-cy="ingredient-main"]').should(
      'have.length',
      9
    );
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');

    // Проверяем отображение соусов
    cy.get('[data-ingredient-type-cy="ingredient-sauce"]').should(
      'have.length',
      4
    );
    cy.contains('Соус фирменный Space Sauce').should('exist');
  });

  it('Должен отображать правильные данные ингредиентов', () => {
    // Проверяем конкретные ингредиенты по их ID
    cy.get('[data-ingredient-id-cy="643d69a5c3f7b9001cfa093c"]')
      .should('contain', 'Краторная булка N-200i')
      .should('contain', '1255');

    cy.get('[data-ingredient-id-cy="643d69a5c3f7b9001cfa0941"]')
      .should('contain', 'Биокотлета из марсианской Магнолии')
      .should('contain', '424');

    cy.get('[data-ingredient-id-cy="643d69a5c3f7b9001cfa0942"]')
      .should('contain', 'Соус Spicy-X')
      .should('contain', '90');
  });

  it('Должен добавлять начинку в конструктор', () => {
    // Проверяем что конструктор пустой
    cy.get('[data-testid-cy="no-ingredients"]').should('exist');

    // Кликаем на кнопку "Добавить" у начинки
    cy.get('[data-cy="addIngredient-643d69a5c3f7b9001cfa0941"]').click();

    // Проверяем что ингредиент добавился в конструктор
    cy.get('[data-testid-cy="constructor-item"]')
      .should('have.length', 1)
      .should('contain', 'Биокотлета из марсианской Магнолии');

    // Проверяем что пропал плейсхолдер
    cy.get('[data-testid-cy="no-ingredients"]').should('not.exist');

    // Проверяем обновление цены
    cy.get('[data-testid-cy="total-price"]').should('contain', '424');
  });

  it('Должен добавлять булку в конструктор', () => {
    // Кликаем на кнопку "Добавить" у булки
    cy.get('[data-cy="addIngredient-643d69a5c3f7b9001cfa093c"]').click();

    // Проверяем что булка добавилась в конструктор (верх и низ)
    cy.get('[data-testid-cy="constructor-bun-top"]').should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-testid-cy="constructor-bun-bottom"]').should(
      'contain',
      'Краторная булка N-200i'
    );

    // Проверяем обновление цены (булка считается дважды)
    cy.get('[data-testid-cy="total-price"]').should('contain', '2510'); // 1255 * 2
  });

  it('Должен добавлять соус в конструктор', () => {
    // Кликаем на кнопку "Добавить" у соуса
    cy.get('[data-cy="addIngredient-643d69a5c3f7b9001cfa0942"]').click();

    // Проверяем что соус добавился в конструктор
    cy.get('[data-testid-cy="constructor-item"]')
      .should('have.length', 1)
      .should('contain', 'Соус Spicy-X');

    // Проверяем обновление цены
    cy.get('[data-testid-cy="total-price"]').should('contain', '90');
  });
});
