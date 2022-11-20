import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsCategoriesSchema from "../../contracts/productsCategories.contract";

describe("Product Categories", () => {
  it("List all product categories - Acceptance", () => {
    cy.getProductsCategories(tokenFixture.token).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body).to.have.length.greaterThan(0);
    });
  });

  it("List all product categories - Contract", () => {
    cy.getProductsCategories(tokenFixture.token).then((res) => {
      for (let i = 0; i < res.body.length; i++) {
        return productsCategoriesSchema.validateAsync(res.body[i]);
      }
    });
  });
});
