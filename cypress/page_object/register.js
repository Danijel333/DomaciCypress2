class Register {

    get registerHeader() {
        return cy.get('h1');
    }

    get firstNameInput() {
        return cy.get('#first-name');
    }

    get lastNameInput() {
        return cy.get('#last-name');
    }

    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#password');
    }

    get confirmPasswordInput() {
        return cy.get('#password-confirmation');
    }

    get termsCheckbox() {
        return cy.get(':checkbox');
    }

    get registerSubmitButton() {
        return cy.get('button');
    }

    get errorMessage() {
        return cy.get('p[class="alert alert-danger"]')
    }

    userRegistration(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.termsCheckbox.check();
        this.registerSubmitButton.click();
    }

    userRegistrationWithoutFirstName(lastName, email, password) {
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.termsCheckbox.check();
        this.registerSubmitButton.click();
    }

    userRegistrationWithoutLastName(firstName, email, password) {
        this.firstNameInput.type(firstName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.termsCheckbox.check();
        this.registerSubmitButton.click();
    }

    userRegistrationWithoutEmail(firstName, lastName, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.termsCheckbox.check();
        this.registerSubmitButton.click();
    }

    userRegistrationInvalidEmail(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.termsCheckbox.check();
        this.registerSubmitButton.click();
    }

    userRegistrationWithoutPassword(firstName, lastName, email, confirmPassword) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.confirmPasswordInput.type(confirmPassword);
        this.termsCheckbox.check();
        this.registerSubmitButton.click();
    }

    userRegistrationWithoutConfirmPassword(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.termsCheckbox.check();
        this.registerSubmitButton.click();
    }

    userRegistrationPasswordNotMatching(firstName, lastName, email, password, confirmPassword) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(confirmPassword);
        this.termsCheckbox.check();
        this.registerSubmitButton.click();
    }

    userRegistrationTermsNotAccepted(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.registerSubmitButton.click();
    }
}

export const registerPage = new Register();