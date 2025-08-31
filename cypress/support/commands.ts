import { SELECTORS, TEST_URL } from '../constants';

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Кастомная команда для мокирования и посещения страницы
Cypress.Commands.add('setupBurgerConstructor', () => {
  // Мокаем запрос ингредиентов
  cy.intercept('GET', 'api/ingredients', {
    fixture: 'constructor/ingredients.json'
  }).as('getIngredients');

  // Посещаем главную страницу
  cy.visit(TEST_URL);

  // Ждем загрузки ингредиентов
  cy.wait('@getIngredients');
});

// Команда для проверки, пустой ли конструктор
Cypress.Commands.add('checkEmptyConstructor', () => {
  cy.get(SELECTORS.CONSTRUCTOR_ITEM).should('not.exist');
  cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('not.exist');
  cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
  cy.get(SELECTORS.NO_BUN_TOP).should('exist');
  cy.get(SELECTORS.NO_INGREDIENTS).should('exist');
  cy.get(SELECTORS.NO_BUN_BOTTOM).should('exist');
});
