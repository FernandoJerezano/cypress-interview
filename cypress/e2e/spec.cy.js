describe('Interview', () => {
  it('Challenge 2', () => {

    cy.visit('https://www.saucedemo.com/');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // this can be loaded from an external file
    const products = [
      {
        name: 'Sauce Labs Backpack',
        price: '$29.99'
      },
      {
        name: 'Sauce Labs Bike Light',
        price: '$9.99'
      }
    ]

    // adding the products
    products.forEach( p => {
      cy.contains(p.name).closest('.inventory_item').find(' button').click();
    });

    // clicking on the cart link
    cy.get('.shopping_cart_link').click();

    // validating items displayed in the cart list is the same number of products to be added
    cy.get('.cart_item_label').should('have.length', products.length);

    // validating for each of the products
    products.forEach(p => {
      cy.contains('.cart_item_label', p.name)
      .within(()=>{
        cy.get('.inventory_item_name').should('have.text', p.name);
        cy.get('.inventory_item_price').should('have.text', p.price);
      });
    })
    
    // go to check out
    cy.get('#checkout').click();

    // input info
    cy.get('#first-name').type('Fernando');
    cy.get('#last-name').type('Jerezano');
    cy.get('#postal-code').type('91809');

    cy.get('#continue').click();

    // finish
    cy.get('#finish').click();

    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  
  })
})