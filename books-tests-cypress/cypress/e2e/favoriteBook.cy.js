const bookFirst = {
  title: "Война и мир",
  description: "Роман-эпопея Льва Толстого, описывающий жизнь русского общества в эпоху наполеоновских войн.",
  author: "Лев Толстой",
};

const bookSecond = {
  title: "Преступление и наказание",
  description: "Роман Федора Достоевского о нравственных исканиях и психологической борьбе главного героя.",
  author: "Федор Достоевский",
};

const bookThird = {
  title: "Мастер и Маргарита",
  description: "Роман Михаила Булгакова, в котором переплетаются сатира, фантастика и философия.",
  author: "Михаил Булгаков",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});