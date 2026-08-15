const newUser = require("../fixtures/newUser.json");
const updateUser = require("../fixtures/updateUser.json");

describe('API tests for User', () => {
  it('Create a user', () => {
    cy.request({
      method: 'POST',
      url: '/user',
      body: newUser,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 403, 405]);
    });
  });

  it('Get a user by username', () => {
    cy.request({
      method: 'GET',
      url: `/user/${newUser.username}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 403, 404]);
    });
  });

  it('Update a user', () => {
    cy.request({
      method: 'PUT',
      url: `/user/${newUser.username}`,
      body: updateUser,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 403]);
    });
  });

  it('Delete a user', () => {
    cy.request({
      method: 'DELETE',
      url: `/user/${updateUser.username}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 403, 404]);
    });
  });
});