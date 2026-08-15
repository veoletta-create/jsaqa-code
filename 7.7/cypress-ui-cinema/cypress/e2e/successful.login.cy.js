const login = require("../fixtures/login-info.json");
const selector = require("../fixtures/selectors-login-page.json");

describe("Log in for admin tests", () => {
  beforeEach(function () {
    cy.visit("http://qamid.tmweb.ru/admin/");
  });

  it("Should successfully log in with correct login and password", () => {
    cy.login(login.validEmail, login.validPassword);
    cy.contains("Управление залами").should("be.visible");
  });
});