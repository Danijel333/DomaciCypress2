class CreateGallery {
    get creteGalleryTitleInput() {
        return cy.get('#title');
    }

    get createGalleryDescriptionInput() {
        return cy.get('#description');
    }

    get createGalleryImageInput() {
        return cy.get('input[class="form-control"]').last();
    }

    get addImageButton() {
        return cy.get('button').contains('Add image');
    }

    get submitGalleryButton() {
        return cy.get('button[class="btn btn-custom"]').first();
    }

    get cancelGalleryButton() {
        return cy.get('button[class="btn btn-custom"]').last();
    }

    get errorMessage() {
        return cy.get('p[class="alert alert-danger"]');
    }

    get deleteSingleImageInput() {
        return cy.get('button[class="input-buttons"]')
            .children('i[class="fas fa-trash"]').first();
    }

    get moveUpButton() {
        return cy.get('button[class="input-buttons"]')
            .children('i[class="fas fa-chevron-circle-up"]').last();
    }

    get moveDownButton() {
        return cy.get('button[class="input-buttons"]')
            .children('i[class="fas fa-chevron-circle-down"]').first();
    }

    createSingleGallery(title, description, image) {
        this.creteGalleryTitleInput.type(title);
        this.createGalleryDescriptionInput.type(description);
        this.createGalleryImageInput.type(image);
        this.submitGalleryButton.click();
    }
    // photosNumber -> how many images we want in a single gallery
    createSingleGalleryWithMultiplePhotos(title, description, image, photosNumber) {
        this.creteGalleryTitleInput.type(title);
        this.createGalleryDescriptionInput.type(description);
        this.createGalleryImageInput.type(image);
        for (let i = 1; i < photosNumber; i++) {
            this.addImageButton.click();
            this.createGalleryImageInput.type(image);
        }
        this.submitGalleryButton.click();
    }

    createGalleryWithoutTitle(description, image) {
        this.createGalleryDescriptionInput.type(description);
        this.createGalleryImageInput.type(image);
        this.submitGalleryButton.click();
    }

    createGalleryWithoutDescription(title, image) {
        this.creteGalleryTitleInput.type(title);
        this.createGalleryImageInput.type(image);
        this.submitGalleryButton.click();
    }

    createGalleryWithoutImage(title, description) {
        this.creteGalleryTitleInput.type(title);
        this.createGalleryDescriptionInput.type(description);
        this.submitGalleryButton.click();
    }
    // pressAddBtn -> how many times we want to press "Add image" button
    deleteImageInput(pressAddBtn) {
        for (let i = 0; i < pressAddBtn; i++) {
            this.addImageButton.click();
        }
        cy.get('div[class="input-group mb-3"]').should('have.length', pressAddBtn + 1);
        for (let i = 0; i < pressAddBtn; i++) {
            this.deleteSingleImageInput.click();
        }
    }

    moveUpAndDownImageInput(pressAddBtn) {
        this.createGalleryImageInput.type('Image1');
        this.addImageButton.click();
        this.createGalleryImageInput.last().type('Image2');
        this.moveDownButton.click();
        this.moveUpButton.click();
        this.moveDownButton.click();


    }
}

export const createGallery = new CreateGallery();