describe("Main page tests", () => {
  it("Should display the main page correctly", () => {
    cy.visit("http://qamid.tmweb.ru", { timeout: 20000 });
    
    cy.get('.page-title, h1, header', { timeout: 15000 }).should('be.visible');
    
    cy.get('.movie, .movie__info, .movie-seances', { timeout: 15000 }).should('exist');
  });
});