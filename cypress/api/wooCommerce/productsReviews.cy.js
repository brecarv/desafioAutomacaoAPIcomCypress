import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsReviewsSchema from "../../contracts/productsReviews.contract";

describe("Product Reviews", () => {
  let productId = 22;
  let reviewText = faker.commerce.productDescription();
  let name = faker.name.fullName();
  let email = faker.internet.email(name);
  let rating = faker.datatype.number(5);

  it.only("List all product reviews - Acceptance and Contract", () => {
    cy.getProductsReviews(tokenFixture.token).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body).to.have.length.greaterThan(0);
      for (let i = 0; i < res.body.length; i++) {
        return productsReviewsSchema.validateAsync(res.body[i]);
      }
    });
  });

  it.only("Retrieve a product review by ID - Acceptance and Contract", () => {
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
      cy.getProductsReviewsByID(tokenFixture.token, reviewId).then((res) => {
        expect(res.status).to.eq(StatusCodes.OK);
        expect(res.body.product_id).to.eq(productId);
        expect(res.body.review).to.contain(reviewText);
        expect(res.body.reviewer).to.eq(name);
        expect(res.body.reviewer_email).to.eq(email);
        expect(res.body.rating).to.eq(rating);
      });
      return (
        productsReviewsSchema.validateAsync(res.body),
        cy.deleteProductsReviewsByID(tokenFixture.token, reviewId, force)
      );
    });
  });

  it.only("Create a product review - Acceptance and Contract", () => {
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
      expect(res.status).to.eq(StatusCodes.CREATED);
      expect(res.body.product_id).to.eq(productId);
      expect(res.body.review).to.eq(reviewText);
      expect(res.body.reviewer).to.eq(name);
      expect(res.body.reviewer_email).to.eq(email);
      expect(res.body.rating).to.eq(rating);
      return (
        productsReviewsSchema.validateAsync(res.body),
        cy.deleteProductsReviewsByID(tokenFixture.token, reviewId, force)
      );
    });
  });

  it("Update a product review - Aceitação", () => {
    cy.postProductsReviews(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let newRating = faker.datatype.number(5);
      let newReviewText = faker.lorem.sentence(5);
      cy.putProductsReviewsByID(
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
        return cy.deleteProductsReviewsByID(
          tokenFixture.token,
          reviewId,
          force
        );
      });
    });
  });

  it("Update a product review - Contrato", () => {
    cy.postProductsReviews(
      tokenFixture.token,
      productId,
      reviewText,
      name,
      email,
      rating
    ).then((res) => {
      let reviewId = res.body.id;
      let newRating = faker.datatype.number(5);
      let newReviewText = faker.lorem.sentence(5);
      cy.putProductsReviewsByID(
        tokenFixture.token,
        reviewId,
        newReviewText,
        newRating
      ).then((res) => {
        let force = true;
        return (
          productsReviewsSchema.validateAsync(res.body),
          cy.deleteProductsReviewsByID(tokenFixture.token, reviewId, force)
        );
      });
    });
  });

  it("Delete a product review - Aceitação", () => {
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
          expect(res.status).to.eq(StatusCodes.OK);
          expect(res.body.deleted).to.be.true;
          expect(res.body.previous.product_id).to.eq(productId);
          expect(res.body.previous.review).to.eq(reviewText);
          expect(res.body.previous.reviewer).to.eq(name);
          expect(res.body.previous.reviewer_email).to.eq(email);
          expect(res.body.previous.rating).to.eq(rating);
        }
      );
    });
  });

  it("Delete a product review - Contrato", () => {
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
