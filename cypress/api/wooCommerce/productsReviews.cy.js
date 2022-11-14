import { StatusCodes } from "http-status-codes";

import tokenFixture from "../../fixtures/token.json";

import productsReviewsSchema from "../../contracts/productsReviews.contract";

describe("Product Reviews", () => {
  it("List all products reviews - Aceitação", () => {
    cy.getProductsReviews(tokenFixture.token).then((res) => {
      expect(res).to.exist;
      expect(res.status).to.eq(StatusCodes.OK);
    });
  });

  it("List all products reviews - Contrato", () => {
    cy.getProductsReviews(tokenFixture.token).then((res) => {
      for (let i = 0; i < res.body.length; i++) {
        return productsReviewsSchema.validateAsync(res.body[i]);
      }
    });
  });

  it.only("List product review by ID - Aceitação", () => {
    let reviewId = 553;
    cy.getProductsReviewsByID(tokenFixture.token, reviewId).then((res) => {
      expect(res).to.exist;
      expect(res.status).to.eq(StatusCodes.OK);
    });
  });

  it.only("List product review by ID - Contrato", () => {
    let reviewId = 553;
    cy.getProductsReviewsByID(tokenFixture.token, reviewId).then((res) => {
      for (let i = 0; i < res.body.length; i++) {
        return productsReviewsSchema.validateAsync(res.body[i]);
      }
    });
  });
});
