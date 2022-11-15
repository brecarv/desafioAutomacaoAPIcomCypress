import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsReviewsSchema from "../../contracts/productsReviews.contract";

describe("Product Reviews", () => {
  it("List all product reviews - Aceitação", () => {
    cy.getProductsReviews(tokenFixture.token).then((res) => {
      expect(res).to.exist;
      expect(res.status).to.eq(StatusCodes.OK);
    });
  });

  it("List all product reviews - Contrato", () => {
    cy.getProductsReviews(tokenFixture.token).then((res) => {
      for (let i = 0; i < res.body.length; i++) {
        return productsReviewsSchema.validateAsync(res.body[i]);
      }
    });
  });

  it("Retrieve a product review by ID - Aceitação", () => {
    let reviewId = 553;
    cy.getProductsReviewsByID(tokenFixture.token, reviewId).then((res) => {
      expect(res).to.exist;
      expect(res.status).to.eq(StatusCodes.OK);
    });
  });

  it("Retrieve a product review by ID - Contrato", () => {
    let reviewId = 553;
    cy.getProductsReviewsByID(tokenFixture.token, reviewId).then((res) => {
      for (let i = 0; i < res.body.length; i++) {
        return productsReviewsSchema.validateAsync(res.body[i]);
      }
    });
  });

  it("Create a product review - Aceitação", () => {
    let productId = 22;
    let reviewText =
      faker.commerce.productDescription() + faker.company.companySuffix();
    let name = faker.name.fullName();
    let email = faker.internet.email(name);
    let rating = faker.datatype.number(5);

    cy.postProductsReviews(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let force = true;
      expect(res).to.exist;
      expect(res.status).to.eq(StatusCodes.CREATED);
      return cy.deleteProductsReviewsByID(tokenFixture.token, reviewId, force);
    });
  });

  it("Create a product review - Contrato", () => {
    let productId = 22;
    let reviewText =
      faker.commerce.productDescription() + faker.company.companySuffix();
    let name = faker.name.fullName();
    let email = faker.internet.email(name);
    let rating = faker.datatype.number(5);

    cy.postProductsReviews(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let force = true;
      return cy.deleteProductsReviewsByID(tokenFixture.token, reviewId, force);
    });
  });

  it("Update a product review - Aceitação", () => {
    let productId = 22;
    let reviewText =
      faker.commerce.productDescription() + faker.company.companySuffix();
    let name = faker.name.fullName();
    let email = faker.internet.email(name);
    let rating = faker.datatype.number(5);

    cy.postProductsReviews(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let newReviewText = faker.lorem.sentence(5);
      cy.putProductsReviewsByID(
        tokenFixture.token,
        reviewId,
        newReviewText,
        rating
      ).then((res) => {
        expect(res).to.exist;
        expect(res.status).to.eq(StatusCodes.OK);
        let force = true;
        return cy.deleteProductsReviewsByID(
          tokenFixture.token,
          reviewId,
          force
        );
      });
    });
  });

  it("Update a product review - Contrato", () => {
    let productId = 22;
    let reviewText =
      faker.commerce.productDescription() + faker.company.companySuffix();
    let name = faker.name.fullName();
    let email = faker.internet.email(name);
    let rating = faker.datatype.number(5);

    cy.postProductsReviews(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let newReviewText = faker.lorem.sentence(5);
      cy.putProductsReviewsByID(
        tokenFixture.token,
        reviewId,
        newReviewText,
        rating
      ).then((res) => {
        let force = true;
        return (
          productsReviewsSchema.validateAsync(res.body.previous),
          cy.deleteProductsReviewsByID(tokenFixture.token, reviewId, force)
        );
      });
    });
  });

  it("Delete a product review - Aceitação", () => {
    let productId = 22;
    let reviewText =
      faker.commerce.productDescription() + faker.company.companySuffix();
    let name = faker.name.fullName();
    let email = faker.internet.email(name);
    let rating = faker.datatype.number(5);

    cy.postProductsReviews(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let force = true;

      cy.deleteProductsReviewsByID(tokenFixture.token, reviewId, force).then(
        (res) => {
          expect(res).to.exist;
          expect(res.status).to.eq(StatusCodes.OK);
          expect(res.body.deleted).to.be.true;
        }
      );
    });
  });

  it("Delete a product review - Contrato", () => {
    let productId = 22;
    let reviewText =
      faker.commerce.productDescription() + faker.company.companySuffix();
    let name = faker.name.fullName();
    let email = faker.internet.email(name);
    let rating = faker.datatype.number(5);

    cy.postProductsReviews(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let force = true;

      cy.deleteProductsReviewsByID(tokenFixture.token, reviewId, force).then(
        (res) => {
          return productsReviewsSchema.validateAsync(res.body.previous);
        }
      );
    });
  });
});
