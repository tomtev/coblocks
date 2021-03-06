/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Block: Accordion', () => {
	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/accordion', true );
	} );

	/**
	 * Test that we can add an accordion item to the content, not add any text or
	 * alter any settings, and are able to successfuly save the block without errors.
	 */
	it( 'can be inserted without errors', () => {
		cy.get( '[data-type="coblocks/accordion"]' ).should( 'exist' );
		helpers.checkForBlockErrors( 'coblocks/accordion' );
	} );

	/**
	 * Test that we can add an accordion item to the page, add content to it,
	 * save and it displays properly without errors.
	 */
	it( 'can be modifed without errors', () => {
		cy.get( '[data-type="coblocks/accordion"] .wp-block-coblocks-accordion-item__title' ).type( 'title' );
		helpers.checkForBlockErrors( 'coblocks/accordion' );
	} );

	/**
	 * Test 'Display Open' attribute works
	 */
	it( 'can be expanded by default when toggling the "open" attribute', () => {
		cy.get( '.editor-post-title__input' ).click();
		cy.get( '[data-type="coblocks/accordion"] .wp-block-coblocks-accordion-item__content' ).should( 'not.exist' );

		cy.get( '[data-type="coblocks/accordion"]' ).click();
		helpers.toggleSettingCheckbox( 'Display as open' );

		cy.get( '.editor-post-title__input' ).click();
		cy.get( '[data-type="coblocks/accordion"] .wp-block-coblocks-accordion-item__content' ).should( 'exist' );

		helpers.checkForBlockErrors( 'coblocks/accordion' );
	} );

	/**
	 * Test that multiple accordion items display as expected
	 */
	it( 'can add multiple accordion item blocks', () => {
		cy.get( '[data-type="coblocks/accordion"]' ).click( { force: true } ).find( '.components-coblocks-add-accordion-item__button' ).click( );
		cy.get( '[data-type="coblocks/accordion"]' ).find( '[data-type="coblocks/accordion-item"]' ).should( 'have.length', 2 );

		helpers.checkForBlockErrors( 'coblocks/accordion' );
	} );

	/**
	 * Test the accordion block color settings
	 */
	it( 'can apply color settings', () => {
		cy.get( '[data-type="coblocks/accordion-item"] .wp-block-coblocks-accordion-item__title' ).type( 'Accordion title' );

		// Title - Background color
		helpers.setColorSetting( 'background', '#000000' );
		cy.get( '[data-type="coblocks/accordion-item"] .wp-block-coblocks-accordion-item__title' ).should( 'have.css', 'background-color', `rgb(0, 0, 0)` );

		// Title - Text color
		helpers.setColorSetting( 'text', '#FFFFFF' );
		cy.get( '[data-type="coblocks/accordion-item"] .wp-block-coblocks-accordion-item__title' ).should( 'have.css', 'color', `rgb(255, 255, 255)` );

		cy.get( '[data-type="coblocks/accordion-item"] .wp-block-paragraph' ).click().type( 'Content' );

		// Content - Background color
		helpers.setColorSetting( 'background', '#000000' );
		cy.get( '[data-type="coblocks/accordion-item"] .wp-block-paragraph' ).should( 'have.css', 'background-color', `rgb(0, 0, 0)` );

		// Content - Text color
		helpers.setColorSetting( 'text', '#FFFFFF' );
		cy.get( '[data-type="coblocks/accordion-item"] .wp-block-paragraph' ).should( 'have.css', 'color', `rgb(255, 255, 255)` );

		helpers.checkForBlockErrors( 'coblocks/accordion' );
	} );

	/**
	 * Test the accordion block custom classes
	 */
	it( 'can have custom classes', () => {
		cy.get( '[data-type="coblocks/accordion-item"]' ).first().click();
		helpers.addCustomBlockClass( 'my-custom-class', 'accordion-item' );

		helpers.checkForBlockErrors( 'coblocks/accordion' );

		cy.get( '.wp-block-coblocks-accordion-item' )
			.should( 'have.class', 'my-custom-class' );
	} );
} );
