/// <reference types="cypress" />
import {
    faker
} from '@faker-js/faker';
import {
    allGalleries
} from "../page_object/galleries.js";

describe('all galleries testing', () => {
    // Ako bih uspeo da iskoristim title poslednje kreiranje galerije,
    // morao bih prepraviti intercept i asertacije. 
    // Kako bih resio URL u interceptu u ovom slucaju, jer sadrzi u sebi searchTerm?
    // let searchTerm = Cypress.env('LAST_CREATED_GALLERY_TITLE');
    let searchTerm = 'To the moon and back';

    before(('login', () => {
        cy.loginUsingBackend();
        cy.validateUrl('not.include', '/login');

    }))

    beforeEach('visit all gallerys page', () => {
        cy.visit('/');
    })

    it('validate page header text', () => {
        cy.validatePageHeader('All Galleries')
            .and('have.css', 'color', 'rgb(72, 73, 75)');
    })

    it('validate page background color', () => {
        allGalleries.pageContainer.should('have.css', 'background-color', 'rgb(190, 189, 184)')
    })

    it('finding galleries with search term', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term=To%20the%20moon%20and%20back'
        }).as('successfulFind');

        allGalleries.populateSearchInput(searchTerm);
        allGalleries.singleGallery.should('have.length', 4);

        cy.wait('@successfulFind').then(interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body.galleries[0].title).eq(searchTerm);
        })
    })

    it('visit single gallery page', () => {
        allGalleries.singleGallery.first().find('a').first().click();
        cy.validateUrl('include', '/galleries')
    })

    it('visit authors page', () => {
        allGalleries.singleGallery.first().find('a').last().click();
        cy.validateUrl('include', '/authors')
    })

    it('check the number of displayed galleries', () => {
        allGalleries.singleGallery.should('have.length', 10);
    })

    it('load more galleries functionality check', () => {
        allGalleries.clickLoadMoreButton();
        allGalleries.singleGallery.should('have.length', 20);
        allGalleries.clickLoadMoreButton();
        allGalleries.singleGallery.should('have.length', 30);
        allGalleries.clickLoadMoreButton();
        allGalleries.singleGallery.should('have.length', 30);
        allGalleries.clickLoadMoreButton();
        allGalleries.singleGallery.should('have.length', 50);
    })



})