/// <reference types="cypress" />
import {
    loginPage
} from "../page_object/login.js";
import {
    navigation
} from "../page_object/navigation.js";

describe('login page with POM and asertations', () => {

    function testUrl(condition, matchingString) {
        cy.url().should(condition, matchingString);
    }

    beforeEach('visit login page', () => {
        cy.visit('/');
        navigation.clickLoginButton();
        testUrl('include', '/login');
        loginPage.loginHeader.should('have.text', 'Please login');
    })

    it('negative case / login with bad email', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login').as('failedLogin');

        loginPage.login('danij@gmail.com', 'ovojesifra33');
        testUrl('include', '/login');
        loginPage.errorMessage.should('have.text', 'Bad Credentials')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');

        cy.wait('@failedLogin').then(interception => {
            expect(interception.response.statusCode).eq(401);
            expect(interception.response.statusMessage).eq('Unauthorized');
        })

    })

    it('negative case / login with bad password', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login').as('failedLogin');

        loginPage.login('dani@gmail.com', 'ovojesifra');
        testUrl('include', '/login');
        loginPage.errorMessage.should('have.text', 'Bad Credentials')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');

        cy.wait('@failedLogin').then(interception => {
            expect(interception.response.statusCode).eq(401);
            expect(interception.response.statusMessage).eq('Unauthorized');
        })

    })

    it('login using valid credentials', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login').as('successfulLogin');

        loginPage.login('dani@gmail.com', 'ovojesifra33');
        cy.url().should('not.include', '/login');

        cy.wait('@successfulLogin').then(interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
        })
    })
})