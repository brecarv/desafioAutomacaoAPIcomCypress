import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsSchemas from "../../contracts/products.contract";

describe("Products", () => {
  it("List all products - Acceptance", () => {
    cy.getProducts(tokenFixture.token).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body).to.have.length.greaterThan(0);
    });
  });

  it("List all products - Contract", () => {
    cy.getProducts(tokenFixture.token).then((res) => {
      for (let i = 0; i < res.body.length; i++) {
        return productsSchemas.validateAsync(res.body[i]);
      }
    });
  });
});
