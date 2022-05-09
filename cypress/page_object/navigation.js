class Navigation {

    get loginButton() {
        return cy.get('a[href="/login"]');
    }

    get registerButton() {
        return cy.get('a[href="/register"]')
    }

    get logoutButton() {
        return cy.get('a[class="nav-link nav-buttons"]').last();
    }

    get allGallerysButton() {
        return cy.get('a[href="/"]')
    }

    clickAllGalleriesButton() {
        this.allGallerysButton.click();
    }

    clickLoginButton() {
        this.loginButton.click();
    }

    clickRegisteButton() {
        this.registerButton.click();
    }

    clickLogoutButton() {
        this.logoutButton.click();
    }
}

export const navigation = new Navigation();