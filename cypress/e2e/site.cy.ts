/// <reference types="cypress" />

describe("the news site", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  describe("html", () => {
    it("should have 1 header and 1 main", () => {
      cy.root().find("header").should("have.length", 1);
      cy.root().find("main").should("have.length", 1);
    });

    it("should have 3 news sections in main", () => {
      cy.get("main").find("section").should("have.length", 3);
    });

    it("should have 12 news articles in main", () => {
      cy.get("main").find("article").should("have.length", 12);
    });

    it("each article should have an image", () => {
      cy.get("article").each(($el) => {
        cy.wrap($el).find("img").should("be.visible");
      });
    });
  });

  describe("visual effects", () => {
    it("buttons have a hover effect", () => {
      cy.get("button").each(($el) => {
        cy.wrap($el).realHover();
        cy.wrap($el).should(
          "not.have.css",
          "background-color",
          "rgb(255, 255, 255)"
        );
      });
    });
  });

  describe("is responsive", () => {
    describe("mobile - small screen", () => {
      beforeEach(() => {
        cy.viewport(320, 667);
      });

      it("displays content in one column", () => {
        cy.get("section").first().invoke("outerWidth").should("be.lt", 320);
      });

      it("should not have a horizontal scroll", () => {
        cy.scrollTo("topRight");
        cy.window().its("scrollX").should("equal", 0);
      });

      it("does not have a nav bar", () => {
        cy.get("nav").should("not.be.visible");
      });
    });

    describe("tablet - medium sized screen", () => {
      beforeEach(() => {
        cy.viewport(768, 1024);
      });

      it("should not be wider than 2 articles", () => {
        cy.get("article")
          .first()
          .then(($article) => {
            cy.get("section")
              .first()
              .should(($section) => {
                expect($section.width()).to.be.gt($article.width() * 2);
                expect($section.width()).to.be.lt($article.width() * 3);
              });
          });
      });

      it("should not have a horizontal scroll", () => {
        cy.scrollTo("topRight");
        cy.window().its("scrollX").should("equal", 0);
      });

      it("has nav bar", () => {
        cy.get("nav").should("be.visible");
      });
    });

    describe("desktop - large screen", () => {
      beforeEach(() => {
        cy.viewport(1536, 1024);
      });

      it("should not be wider than 4 articles", () => {
        cy.get("article")
          .first()
          .then(($article) => {
            cy.get("section")
              .first()
              .should(($section) => {
                expect($section.width()).to.be.gt($article.width() * 4);
                expect($section.width()).to.be.lt($article.width() * 5);
              });
          });
      });

      it("should not have a horizontal scroll", () => {
        cy.scrollTo("topRight");
        cy.window().its("scrollX").should("equal", 0);
      });

      it("has nav bar", () => {
        cy.get("nav").should("be.visible");
      });
    });
  });
});
