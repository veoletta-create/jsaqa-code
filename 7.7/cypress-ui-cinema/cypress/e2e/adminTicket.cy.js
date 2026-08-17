describe("Booking tickets tests", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('chairChecked')) {
      return false;
    }
    return true;
  });

  it("Should check movie availability from admin and ticket booking", () => {
    const login = require("../fixtures/login-info.json");
    const booking = require("../fixtures/adminSelectors.json");

    cy.visit("http://qamid.tmweb.ru/admin/");
    cy.login(login.validEmail, login.validPassword);

    cy.get('body', { timeout: 10000 }).then(($body) => {
      if ($body.text().includes('Смените пароль')) {
        cy.contains('OK').click({ force: true });
      }
    });

    cy.get('.conf-step__title').first().click({ force: true });

    cy.get('.conf-step__movie-title', { timeout: 20000 }).should('exist');

    cy.get('.conf-step__movie-title')
      .first()
      .invoke('text')
      .then((movieTitle) => {
        cy.visit("http://qamid.tmweb.ru");
        cy.contains(".movie__title", movieTitle).should("be.visible").click();

        cy.get(".movie-seances__time").first().click({ force: true });

        cy.get(".buying-scheme__chair:not(.buying-scheme__chair_taken)").first().click();

        cy.get(booking.bookingHall).click();
      });
  });
});