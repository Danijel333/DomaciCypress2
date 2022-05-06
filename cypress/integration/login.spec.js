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
        loginPage.login('danij@gmail.com', 'ovojesifra33');
        testUrl('include', '/login');
        loginPage.errorMessage.should('have.text', 'Bad Credentials')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')

    })

    it('negative case / login with bad password', () => {
        loginPage.login('dani@gmail.com', 'ovojesifra');
        testUrl('include', '/login');
        loginPage.errorMessage.should('have.text', 'Bad Credentials')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')

    })

    it('login using valid credentials', () => {
        loginPage.login('dani@gmail.com', 'ovojesifra33');
        cy.url().should('not.include', '/login')
    })
})