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

//-- Function that will check if page header matches matching string which is sent as a parameter--
Cypress.Commands.add('validatePageHeader', (matchingString) => {
    cy.get('h1').should('have.text', matchingString);
})

// -- Function that will test if URL contains or not given string --
Cypress.Commands.add('validateUrl', (condition, matchingUrlString) => {
    cy.url().should(condition, matchingUrlString);
})

//-- Login function --
Cypress.Commands.add('loginUsingBackend', () => {
    cy.request({
        method: "POST",
        url: Cypress.env('LOGIN_URL'),
        body: {
            email: Cypress.env('EXTERNAL_EMAIL'),
            password: Cypress.env('EXTERNAL_PASSWORD')
        }
    }).its('body').then(response => {
        window.localStorage.setItem('token', response.access_token);
    })
})