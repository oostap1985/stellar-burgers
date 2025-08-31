import { TEST_URL } from '../../constants';
import { SELECTORS, getAddButtonSelector } from '../../constants';

describe('Создание заказа', () => {
  beforeEach(() => {
    // Мокаем запрос ингредиентов
    // cy.intercept('GET', 'api/ingredients', {
    //   fixture: 'constructor/ingredients.json'
    // }).as('getIngredients');

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
    // cy.visit(TEST_URL);

    // Ждем запрос ингредиентов
    // cy.wait('@getIngredients');

    cy.setupBurgerConstructor();
  });

  it('Создание заказа и открытие модального окна после отправления с результатом', () => {
    // Проверяем, что конструктор изначально пустой
    cy.checkEmptyConstructor();

    // Собираем бургер
    cy.get(getAddButtonSelector('643d69a5c3f7b9001cfa093c')).click();
    cy.get(getAddButtonSelector('643d69a5c3f7b9001cfa0941')).click();
    cy.get(getAddButtonSelector('643d69a5c3f7b9001cfa0942')).click();

    // Кликаем по кнопке "Оформить заказ"
    cy.get(SELECTORS.CREATE_ORDER_BUTTON).should('not.be.disabled').click();

    // Ждем ответ запроса создания заказа
    cy.wait('@createOrder'); // убрал { timeout: 10000 }

    // Проверяем что модальное окно открылось
    cy.get(SELECTORS.MODAL) // убрал { timeout: 10000 }
      .should('be.visible')
      .should('contain', '12345');

    // Закрываем модальное окно
    cy.get(SELECTORS.MODAL_CLOSE).click();
    cy.get(SELECTORS.MODAL).should('not.exist');

    // Проверяем, что конструктор пустой после оформления заказа
    cy.checkEmptyConstructor();
  });
});
