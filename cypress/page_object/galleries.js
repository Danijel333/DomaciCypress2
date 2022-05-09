class Galleries {

    get galleriesHeader() {
        return cy.get('h1');
    }

    get pageContainer() {
        return cy.get('#app');
    }

    get singleGallery() {
        return cy.get('.cell');
    }

    get searchInput() {
        return cy.get('input');
    }

    get filerButton() {
        return cy.get('button').first();
    }

    get loadMoreButton() {
        return cy.get('button').last();
    }

    clickLoadMoreButton() {
        this.loadMoreButton.click();
    }

    populateSearchInput(searchTerm) {
        this.searchInput.type(searchTerm);
        this.filerButton.click();
    }

}

export const allGalleries = new Galleries();