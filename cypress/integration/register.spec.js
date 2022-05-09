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

    beforeEach('visit register page', () => {
        cy.visit('/register');
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register');
        userData.randomFirstName = faker.name.firstName();
        userData.randomLastName = faker.name.lastName();
        userData.randomEmail = faker.internet.email();
        userData.randomPassword = faker.internet.password() + '8';

    })

    it('negative case / missing first name input', () => {
        registerPage.userRegistrationWithoutFirstName(
            userData.randomLastName,
            userData.randomEmail,
            userData.randomPassword,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.firstNameInput.should('be.empty');
    })

    it('negative case / missing last name input', () => {
        registerPage.userRegistrationWithoutLastName(
            userData.randomFirstName,
            userData.randomEmail,
            userData.randomPassword,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.lastNameInput.should('be.empty');
    })

    it('negative case / missing email input', () => {
        registerPage.userRegistrationWithoutEmail(
            userData.randomFirstName,
            userData.randomLastName,
            userData.randomPassword,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / missing .com in email input', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/register').as('failedRegistration');

        registerPage.userRegistrationInvalidEmail(
            userData.randomFirstName,
            userData.randomLastName,
            'dani@gmail',
            userData.randomPassword,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.errorMessage.should('have.text', 'The email must be a valid email address.')

        cy.wait('@failedRegistration').then(interception => {
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.statusMessage).eq('Unprocessable Entity');
        })
    })

    it('negative case / missing @ in email input', () => {
        registerPage.userRegistrationInvalidEmail(
            userData.randomFirstName,
            userData.randomLastName,
            'danigmail.com',
            userData.randomPassword,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / email missing part before @', () => {
        registerPage.userRegistrationInvalidEmail(
            userData.randomFirstName,
            userData.randomLastName,
            '@gmail.com',
            userData.randomPassword,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / email missing part between @ and .com', () => {
        registerPage.userRegistrationInvalidEmail(
            userData.randomFirstName,
            userData.randomLastName,
            'dani@.com',
            userData.randomPassword,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / missing password input', () => {
        registerPage.userRegistrationWithoutPassword(
            userData.randomFirstName,
            userData.randomLastName,
            userData.randomEmail,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / missing confirm password input', () => {
        registerPage.userRegistrationWithoutConfirmPassword(
            userData.randomFirstName,
            userData.randomLastName,
            userData.randomEmail,
            userData.randomPassword
        )
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register')
    })

    it('negative case / confirm password input does not match', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/register').as('failedRegistration');

        registerPage.userRegistrationPasswordNotMatching(
            userData.randomFirstName,
            userData.randomLastName,
            userData.randomEmail,
            userData.randomPassword,
            'nekanovasifra'
        )
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register');
        registerPage.errorMessage.should(
            'have.text',
            'The password confirmation does not match.'
        ).and('have.css', 'background-color', 'rgb(248, 215, 218)');

        cy.wait('@failedRegistration').then(interception => {
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.statusMessage).eq('Unprocessable Entity');
        })

    })

    it('negative case / t&c not accepted, checkbox not marked', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/register').as('failedRegistration');

        registerPage.userRegistrationTermsNotAccepted(
            userData.randomFirstName,
            userData.randomLastName,
            userData.randomEmail,
            userData.randomPassword,
        )
        cy.validateUrl('include', '/register');
        registerPage.registerHeader.should('have.text', 'Register');
        registerPage.errorMessage.should(
            'have.text',
            'The terms and conditions must be accepted.'
        ).and('have.css', 'background-color', 'rgb(248, 215, 218)');

        cy.wait('@failedRegistration').then(interception => {
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.statusMessage).eq('Unprocessable Entity');
        })

    })

    it('registration with valid data', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/register').as('successfulRegistration');
        registerPage.userRegistration(
            userData.randomFirstName,
            userData.randomLastName,
            userData.randomEmail,
            userData.randomPassword
        );
        cy.validateUrl('not.include', '/register');

        cy.wait('@successfulRegistration').then(interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
        })
    })
})