describe("Add wordset", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/home");
    cy.setCookie(
      "authjs.session-token",
      "my_token123",
    );
    cy.setCookie(
      "authjs.csrf-token",
      "second_token123",
    );
    cy.reload();
    cy.visit("localhost:3000/home");

  });

  it('test formularza', function() {
    cy.visit('http://localhost:3000/home');
    cy.get('.flex > .lucide').click();
    cy.get('#\\:ri\\:-form-item').type('Rosyjski zestaw');
    cy.get('#\\:ro\\:-form-item').type('Fajny zestaw');
    cy.get('.flex-wrap > :nth-child(1) > .z-0').click();
    cy.get('#\\:r1q\\:').click();
    cy.get(':nth-child(2) > .z-0').click();
    cy.get('#\\:r4h\\:').click();
    cy.get('.flex-wrap').click();
    cy.get('.pt-4 > .px-3').click();
    cy.get('#\\:r76\\:-form-item').clear();
    cy.get('#\\:r76\\:-form-item').type('Dziwne slowo');    
    cy.get('#\\:r7c\\:-form-item').clear();
    cy.get('#\\:r7c\\:-form-item').type('Taa');
    cy.get('.pt-4 > .px-3').click();
    cy.get('#\\:r7k\\:-form-item').clear();
    cy.get('#\\:r7k\\:-form-item').type('Kolejne slowo');
    cy.get('#\\:r7q\\:-form-item').clear();
    cy.get('#\\:r7q\\:-form-item').type('Noo');
    cy.get('.pt-4 > .px-3').click();
    cy.get('#\\:r82\\:-form-item').clear();
    cy.get('#\\:r82\\:-form-item').type('trzecie slowo');
    cy.get('#\\:r88\\:-form-item').clear();
    cy.get('#\\:r88\\:-form-item').type('Taak');
    cy.get('.pt-4 > .px-3').click();
    cy.get('#\\:r8g\\:-form-item').clear();
    cy.get('#\\:r8g\\:-form-item').type('Lspfdp');
    cy.get(':nth-child(4) > .divItem > :nth-child(2) > .group > .flex > .tap-highlight-transparent > .inline-flex').click();
    cy.get('#\\:r8m\\:-form-item').clear();
    cy.get('#\\:r8m\\:-form-item').type('tretert');
    cy.get('.pt-4 > .px-3').click();
    cy.get('#\\:r8u\\:-form-item').clear();
    cy.get('#\\:r8u\\:-form-item').type('ewre');
    cy.get(':nth-child(5) > .divItem > :nth-child(2) > .group > .flex > .tap-highlight-transparent > .inline-flex').click();
    cy.get('#\\:r94\\:-form-item').clear();
    cy.get('#\\:r94\\:-form-item').type('ytryrty');
    cy.get('.pt-4 > .font-normal').click();
    cy.url().should('eq', 'http://localhost:3000/home');
  });
});
