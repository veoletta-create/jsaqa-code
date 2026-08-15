const login = require("../fixtures/login-info.json");
const selector = require("../fixtures/selectors-login-page.json");

describe("Log in for admin tests", () => {
  beforeEach(function () {
    cy.visit("http://qamid.tmweb.ru/admin/");
  });

  it("Should not log in with incorrect login and password", () => {
    cy.login(login.invalidEmail, login.invalidPassword);
    cy.contains("Ошибка авторизации!").should("be.visible");
  });

  it("Should warn if email is empty", () => {
    cy.login(" ", login.validPassword);
    cy.get(selector.email)
      .then(($el) => {
        return $el[0].checkValidity();
      })
      .should("be.false");
  });
});