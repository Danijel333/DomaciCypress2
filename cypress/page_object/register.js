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

    populateFirstName(firstName) {
        this.firstNameInput.type(firstName);
    }

    populateLastName(lastName) {
        this.lastNameInput.type(lastName);
    }

    populateEmail(email) {
        this.emailInput.type(email);
    }

    populatePassword(password) {
        this.passwordInput.type(password);
    }

    populateConfirmedPassword(confirmPassword) {
        this.confirmPasswordInput.type(confirmPassword);
    }

    markTermsCheckbox() {
        this.termsCheckbox.check();
    }

    clickSubmitButton() {
        this.registerSubmitButton.click();
    }

    userRegistration(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.markTermsCheckbox();
        this.clickSubmitButton();
    }

    userRegistrationWithoutFirstName(lastName, email, password) {
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.markTermsCheckbox();
        this.clickSubmitButton();
    }

    userRegistrationWithoutLastName(firstName, email, password) {
        this.firstNameInput.type(firstName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.markTermsCheckbox();
        this.clickSubmitButton();
    }

    userRegistrationWithoutEmail(firstName, lastName, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.markTermsCheckbox();
        this.clickSubmitButton();
    }

    userRegistrationInvalidEmail(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.markTermsCheckbox();
        this.clickSubmitButton();
    }

    userRegistrationWithoutPassword(firstName, lastName, email, confirmPassword) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.confirmPasswordInput.type(confirmPassword);
        this.markTermsCheckbox();
        this.clickSubmitButton();
    }

    userRegistrationWithoutConfirmPassword(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.markTermsCheckbox();
        this.clickSubmitButton();
    }

    userRegistrationPasswordNotMatching(firstName, lastName, email, password, confirmPassword) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(confirmPassword);
        this.markTermsCheckbox();
        this.clickSubmitButton();
    }

    userRegistrationTermsNotAccepted(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmPasswordInput.type(password);
        this.clickSubmitButton();
    }
}

export const registerPage = new Register();