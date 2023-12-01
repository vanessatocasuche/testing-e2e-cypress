// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("iniciarSesion", (email, password) => {
	// Arrange
	cy.visit('https://opensource-demo.orangehrmlive.com/')

	// Act
	cy.get('input').eq(1).type(email)
	cy.get('input').eq(2).type(password)
	cy.get('button').click()
	cy.wait(3000)

	// Assert
	cy.get('h6').should('contain', 'Dashboard')
})

Cypress.Commands.add('inputCommand', (selector) => {
	return cy.get(`input[name=${selector}]`);
});