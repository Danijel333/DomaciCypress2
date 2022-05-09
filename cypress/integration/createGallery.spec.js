import {
    faker
} from '@faker-js/faker';
import {
    createGallery
} from "../page_object/createGallery.js";

describe('create gallery', () => {

    beforeEach('login and visid create gallery page', () => {
        cy.loginUsingBackend();
        cy.visit('/create');
        cy.validateUrl('include', '/create')
    })

    it('validate page header', () => {
        cy.validatePageHeader('Create Gallery')
    })

    it('negative case / create gallery without title', () => {
        createGallery.createGalleryWithoutTitle(
            faker.lorem.words(5),
            faker.image.cats(360, 460, true) + ".jpg"
        )
        createGallery.creteGalleryTitleInput.then((response) => {
            expect(response[0].validationMessage).eq('Please fill out this field.')
        })
    })

    it('negative case / create gallery without image', () => {
        createGallery.createGalleryWithoutImage(
            faker.name.jobTitle(),
            faker.lorem.words(5)
        );

        createGallery.createGalleryImageInput.then(response => {
            expect(response[0].validationMessage).eq('Please fill out this field.');
        })
    })

    it('negative case / create gallery with invalid url', () => {
        createGallery.createSingleGallery(
            faker.name.jobTitle(),
            faker.lorem.words(5),
            'Neki unos'
        );

        createGallery.createGalleryImageInput.then(response => {
            expect(response[0].validationMessage).eq('Please enter a URL.');
        })
    })

    it('negative case / create gallery with url thas is missing image extension', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('failedCreateGallery');

        createGallery.createSingleGallery(
            faker.name.jobTitle(),
            faker.lorem.words(5),
            faker.image.cats(360, 460, true)
        );

        createGallery.errorMessage.should('have.text', 'Wrong format of image');

        cy.wait('@failedCreateGallery').then(interception => {
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.statusMessage).eq('Unprocessable Entity');
        })
    })

    it('create gallery without description', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries')
            .as('galleryCreated');

        createGallery.createGalleryWithoutDescription(
            faker.name.jobTitle(),
            faker.image.cats(360, 460, true) + ".jpg"
        )

        cy.wait('@galleryCreated').then(interception => {
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created')
        })
    })

    it('add one more image functionality check', () => {
        createGallery.addImageButton.click();
        cy.get('input').should('have.length', 4);
        createGallery.addImageButton.click();
        cy.get('input').should('have.length', 5);
    })

    it('delete images input functionality check', () => {
        createGallery.deleteImageInput(2);
        createGallery.createGalleryImageInput.should('have.length', 1);
    })

    it('move up and down image input', () => {
        createGallery.moveUpAndDownImageInput();
        createGallery.createGalleryImageInput.should('have.value', 'Image1');
    })

    it('create single gallery with one photo', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries')
            .as('galleryCreated');

        createGallery.createSingleGallery(
            faker.name.jobTitle(),
            faker.lorem.words(5),
            faker.image.cats(360, 460, true) + ".jpg"
        )

        cy.wait('@galleryCreated').then(interception => {
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created')
        })
    })

    it('creating single gallery with multiple photos', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/galleries')
            .as('galleryCreated');
        createGallery.createSingleGalleryWithMultiplePhotos(
            faker.name.jobTitle(),
            faker.lorem.words(5),
            faker.image.cats(360, 460, true) + ".jpg",
            faker.datatype.number(10)
        )
        cy.wait('@galleryCreated').then(interception => {
            // Ovde sam hteo da sacuvam title iz kreiranog objekta u env varijablu i kada je logujem
            // prikazuje da ima vrednost, ali kad pokusam da je iskoristim kao searchTerm da bih nasao odredjenu galeriju
            // dobijam undefined.
            Cypress.env.LAST_CREATED_GALLERY_TITLE = interception.response.body.title;
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created')
        })

    })

    it('validate cancel button functionality', () => {
        createGallery.cancelGalleryButton.click();
        cy.validateUrl('not.include', '/create');
        cy.validatePageHeader('All Galleries');
    })
})