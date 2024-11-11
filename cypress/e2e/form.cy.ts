describe("Add wordset", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/home");
    cy.setCookie(
      "authjs.session-token",
      "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoicTFXYnFZUzdTajlSbFV3Y25IcVU5RVR1R2xLVW1SeXFrbU1tMzlkcHpmbTdQN1hEV2lHRGloNzNOalI3WlNHVjJFR0pXMVdkRndWM2Y5VUx1WHJUTHcifQ..tLET144Fj1Cesm2CFr03hQ.X6Xdn2i1J1iclI7K7SXdVgeINmd-1iu5BZJnILvxDUfCNbE7WO2lbyvhA--niEaeHKR_gFJACqHIbjihhksI9KVCXSvg7gW1v2T6U3GXgF2JGiOWxB0VUpRKFwonZVxMYG-Ewjd87P9UcJnjef_NR7hYbq7A20g4TsIP-WVi_i1qJKMMLBjoX4nmKKTodgleGCoVe-S4J81LJx8MCfOB-PVBPLg6ODnou_pc9K2p-EZ9EFHl6H4XV9r13g7uw5430Vgmc-tSHG5lPcq16gPhoLqvy6SOnL0NGe0V9uGwda5AW2e9TQREeWL28gPu9gR_kPDCwM0Anvfd4r1ifQwnxb-owRLpMkfPuGx1KrWWGDvjpbN5jPISKpkAGA2HAXMsbGcf-YBkrwVJ3Vd1rkH7G70MW0ydThlXfkdbS7Dd7XjtYD-VnQYdkFYhkz3EbUfIUax-xjtuutneYaNojqgIZ_CKsRjeuER6FNmvuthpnOKlxR-x5y7kpTbDm8NUK_UN5CagtpNMHOgoSElSTWFnXdLSjU6zbpuP8qd-B9L5nowVJZiQ1it_QLT7JLzMAEJ9pwAqpyL6FqGsqKtSYGAp-w.MgjzCFBiUqyMGdF0iLeRBqOlGdr1zS4pzoY6yNqfNgs"
    );
    cy.setCookie(
      "authjs.csrf-token",
      "5043d30709a8497acc0403d240985572dce63cf7276a173b56362bf08306805f%7C6e04b8228f8e1d0acf1472c895c0b90d45e07fac9ce51b8087fc0539dd434993"
    );
    cy.reload();
    cy.visit("localhost:3000/home");
  });

  it('Dodanie zestawu słów', function() {
    cy.visit('http://localhost:3000/home');

    cy.get('.flex > .lucide').click();
    cy.get('[data-cy="title"]').clear();
    cy.get('[data-cy="title"]').type('Francuski zestaw');
    cy.get('[data-cy="description"]').click();
    cy.get('[data-cy="firstLanguage"]').click();
    cy.get('[data-cy="firstLanguage-cm20xydig000214fbbfl07p8f"]').click();
    cy.get('[data-cy="secondLanguage"]').click();
    cy.get('[data-cy="secondLanguage-cm20xydaz000014fbdn4e6ouy"]').click();
    cy.get('#folders').click();
    cy.get('#folders-cm24peqh4000zlabx4gc50f1p').click();
    cy.get('.flex-col.gap-4').click();
    cy.get('h4').click();
    cy.get('.pt-4 > .px-3').click();
    cy.get('[data-cy="originalWord-0"]').clear();
    cy.get('[data-cy="originalWord-0"]').type('fr1');
    cy.get('[data-cy="translatedWord-0"]').clear();
    cy.get('[data-cy="translatedWord-0"]').type('pl1');
    cy.get('.pt-4 > .px-3').click();
    cy.get('[data-cy="originalWord-1"]').clear();
    cy.get('[data-cy="originalWord-1"]').type('fr2');
    cy.get('[data-cy="translatedWord-1"]').clear();
    cy.get('[data-cy="translatedWord-1"]').type('pl2');
    cy.get('.pt-4 > .px-3').click();
    cy.get('[data-cy="originalWord-2"]').clear();
    cy.get('[data-cy="originalWord-2"]').type('fr3');
    cy.get('[data-cy="translatedWord-2"]').clear();
    cy.get('[data-cy="translatedWord-2"]').type('pl3');
    cy.get('.pt-4 > .px-3').click();
    cy.get('[data-cy="originalWord-3"]').clear();
    cy.get('[data-cy="originalWord-3"]').type('fr4');
    cy.get('[data-cy="translatedWord-3"]').clear();
    cy.get('[data-cy="translatedWord-3"]').type('pl4');
    cy.get('.pt-4 > .px-3').click();
    cy.get('[data-cy="originalWord-4"]').clear();
    cy.get('[data-cy="originalWord-4"]').type('fr5');
    cy.get('[data-cy="translatedWord-4"]').clear();
    cy.get('[data-cy="translatedWord-4"]').type('pl5');
    cy.get('.pt-4 > .font-normal').click();
    cy.url().should('eq', 'http://localhost:3000/home');
  });

  it("Edycja folderu", function () {
    cy.visit("http://localhost:3000/home");

    cy.get(
      '[style="background-color:rgba(255,0,0)"] > .mb-3 > [fill="#FFCA28"]'
    ).click();
    cy.get(".pb-4 > .inline-flex > .lucide").click();

    cy.get('[data-cy="folder-title"]')
      .invoke("text")
      .then((tekstPrzed) => {
        cy.log("Oryginalny tekst folderu:", tekstPrzed);

        cy.get("#\\:rk\\:-form-item").clear().type("Hiszpański");

        cy.get("form > .justify-center").click();

        cy.get('[data-cy="folder-title"]').should("have.text", "Hiszpański");
      });
  });
});
