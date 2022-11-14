import { StatusCodes } from "http-status-codes";

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
});
