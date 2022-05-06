/// <reference types="cypress" />
import {
    faker
} from '@faker-js/faker';
import {
    registerPage
} from "../page_object/register.js";


describe('registration using POM and asertations', () => {

    let userData = {
        randomFirstName: '',
        randomLastName: '',
        randomEmail: '',
        randomPassword: ''
    }

    function testUrl(condition, matchingString) {
        cy.url().should(condition, matchingString);
    }

    beforeEach('visit register page', () => {
        cy.visit('/register');
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register');
        userData.randomFirstName = faker.name.firstName();
        userData.randomLastName = faker.name.lastName();
        userData.randomEmail = faker.internet.email();
        userData.randomPassword = faker.internet.password() + '8';

    })

    it('negative case / missing first name input', () => {
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type(userData.randomEmail);
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.firstNameInput.should('be.empty');
    })

    it('negative case / missing last name input', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.emailInput.type(userData.randomEmail);
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.lastNameInput.should('be.empty');
    })

    it('negative case / missing email input', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / missing .com in email input', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type('dani@gmail');
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.errorMessage.should('have.text', 'The email must be a valid email address.')
    })

    it('negative case / missing @ in email input', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type('danigmail.com');
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / email missing part before @', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type('@gmail.com');
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / email missing part between @ and .com', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type('dav@.com');
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / missing password input', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type(userData.randomEmail);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / missing confirm password input', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type(userData.randomEmail);
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / confirm password input does not match', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type(userData.randomEmail);
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type('dsdsdsd');
        registerPage.markTermsCheckbox();
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register');
        registerPage.errorMessage.should(
            'have.text',
            'The password confirmation does not match.'
        ).and('have.css', 'background-color', 'rgb(248, 215, 218)');

    })

    it('negative case / t&c not accepted, checkbox not marked', () => {
        registerPage.firstNameInput.type(userData.randomFirstName);
        registerPage.lastNameInput.type(userData.randomLastName);
        registerPage.emailInput.type(userData.randomEmail);
        registerPage.passwordInput.type(userData.randomPassword);
        registerPage.confirmPasswordInput.type(userData.randomPassword);
        registerPage.clickSubmitButton();
        testUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register');
        registerPage.errorMessage.should(
            'have.text',
            'The terms and conditions must be accepted.'
        ).and('have.css', 'background-color', 'rgb(248, 215, 218)');

    })

    it('registration with valid data', () => {
        registerPage.userRegistration(
            userData.randomFirstName,
            userData.randomLastName,
            userData.randomEmail,
            userData.randomPassword
        );
        testUrl('not.include', '/register');
    })
})