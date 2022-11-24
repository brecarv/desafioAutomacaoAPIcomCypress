import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productReviewsSchema from "../../contracts/productReviews.contract";

describe("Product Reviews", () => {
  let productId = 22;
  let reviewText = faker.commerce.productDescription();
  let name = faker.name.fullName();
  let email = faker.internet.email(name);
  let rating = faker.datatype.number({ min: 1, max: 5, precision: 1 });

  it("List all product reviews - Aceitação e Contrato", () => {
    cy.getProductsReviews(tokenFixture.token).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body).to.have.length.greaterThan(0);
      for (let i = 0; i < res.body.length; i++) {
        return productReviewsSchema.validateAsync(res.body[i], {
          context: { method: "get" },
        });
      }
    });
  });

  it("Retrieve a product review - Aceitação e Contrato", () => {
    cy.postProductReview(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let force = true;
      cy.getProductReviewByID(tokenFixture.token, reviewId).then((res) => {
        expect(res.status).to.eq(StatusCodes.OK);
        expect(res.body.product_id).to.eq(productId);
        expect(res.body.review).to.contain(reviewText);
        expect(res.body.reviewer).to.eq(name);
        expect(res.body.reviewer_email).to.eq(email);
        expect(res.body.rating).to.eq(rating);
      });
      return (
        productReviewsSchema.validateAsync(res.body, {
          context: { method: "get" },
        }),
        cy.deleteProductReviewByID(tokenFixture.token, reviewId, force)
      );
    });
  });

  it("Create a product review - Aceitação e Contrato", () => {
    cy.postProductReview(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let force = true;
      expect(res.status).to.eq(StatusCodes.CREATED);
      expect(res.body.product_id).to.eq(productId);
      expect(res.body.review).to.eq(reviewText);
      expect(res.body.reviewer).to.eq(name);
      expect(res.body.reviewer_email).to.eq(email);
      expect(res.body.rating).to.eq(rating);
      return (
        productReviewsSchema.validateAsync(res.body, {
          context: { method: "post" },
        }),
        cy.deleteProductReviewByID(tokenFixture.token, reviewId, force)
      );
    });
  });

  it("Update a product review - Aceitação e Contrato", () => {
    cy.postProductReview(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let newRating = faker.datatype.number({ min: 1, max: 5, precision: 1 });
      let newReviewText = faker.lorem.sentence(5);
      cy.putProductReviewByID(
        tokenFixture.token,
        reviewId,
        newReviewText,
        newRating
      ).then((res) => {
        let force = true;
        expect(res.status).to.eq(StatusCodes.OK);
        expect(res.body.product_id).to.eq(productId);
        expect(res.body.review).to.eq(newReviewText);
        expect(res.body.reviewer).to.eq(name);
        expect(res.body.reviewer_email).to.eq(email);
        expect(res.body.rating).to.eq(newRating);
        return (
          productReviewsSchema.validateAsync(res.body, {
            context: { method: "put" },
          }),
          cy.deleteProductReviewByID(tokenFixture.token, reviewId, force)
        );
      });
    });
  });

  it("Delete a product review - Aceitação e Contrato", () => {
    cy.postProductReview(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let force = true;
      cy.deleteProductReviewByID(tokenFixture.token, reviewId, force).then(
        (res) => {
          expect(res.status).to.eq(StatusCodes.OK);
          expect(res.body.deleted).to.be.true;
          expect(res.body.previous.product_id).to.eq(productId);
          expect(res.body.previous.review).to.eq(reviewText);
          expect(res.body.previous.reviewer).to.eq(name);
          expect(res.body.previous.reviewer_email).to.eq(email);
          expect(res.body.previous.rating).to.eq(rating);
          return productReviewsSchema.validateAsync(res.body, {
            context: { method: "delete" },
          });
        }
      );
    });
  });
});
