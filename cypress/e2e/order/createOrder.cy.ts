describe('Создание заказа', () => {
  beforeEach(() => {
    // Мокаем запрос ингредиентов
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'constructor/ingredients.json'
    }).as('getIngredients');

    // Мокаем запрос пользователя
    cy.intercept('GET', 'api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'ostapchukoleg1985@gmail.com',
          name: 'Остапчук Олег'
        }
      }
    }).as('getUser');

    // Мокаем запрос создания заказа
    cy.intercept('POST', 'api/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Space burger',
        order: {
          number: 12345
        }
      }
    }).as('createOrder');

    // Устанавливаем токены в localStorage до посещения страницы
    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'test-access-token');
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    // Посещаем главную страницу
    cy.visit('http://localhost:4000');

    // Ждем запрос ингредиентов
    cy.wait('@getIngredients');
  });

  it('Создание заказа и открытие модального окна после отправления с результатом', () => {
    // Проверяем, что конструктор изначально пустой
    // cy.get('[data-testid-cy="constructor-item"]').should('not.exist');
    // cy.get('[data-testid-cy="no-bun-top"]').should('exist');
    // cy.get('[data-testid-cy="no-ingredients"]').should('exist');
    // cy.get('[data-testid-cy="no-bun-bottom"]').should('exist');

    // Собираем бургер
    cy.get('[data-cy="addIngredient-643d69a5c3f7b9001cfa093c"]').click();
    cy.get('[data-cy="addIngredient-643d69a5c3f7b9001cfa0941"]').click();
    cy.get('[data-cy="addIngredient-643d69a5c3f7b9001cfa0942"]').click();

    // Кликаем по кнопке "Оформить заказ"
    cy.get('[data-testid-cy="create-order-button"]')
      .should('not.be.disabled')
      .click();

    // Ждем ответ запроса создания заказа
    cy.wait('@createOrder'); // убрал { timeout: 10000 }

    // Проверяем что модальное окно открылось
    cy.get('[data-testid-cy="modal"]') // убрал { timeout: 10000 }
      .should('be.visible')
      .should('contain', '12345');

    // Закрываем модальное окно
    cy.get('[data-testid-cy="modal-close"]').click();
    cy.get('[data-testid-cy="modal"]').should('not.exist');

    // Проверяем, что конструктор пустой после оформления заказа
    cy.get('[data-testid-cy="constructor-item"]').should('not.exist');
    cy.get('[data-testid-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid-cy="constructor-bun-bottom"]').should('not.exist');
  });
});
