class LoginPage {

    get loginHeader() {
        return cy.get('h1');
    }

    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#password');
    }

    get submitButton() {
        return cy.get('button');
    }

    get errorMessage() {
        return cy.get('p[class="alert alert-danger"]');
    }

    clickLoginSubmitButton() {
        this.submitButton.click();
    }

    login(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.clickLoginSubmitButton();
    }

}

export const loginPage = new LoginPage();