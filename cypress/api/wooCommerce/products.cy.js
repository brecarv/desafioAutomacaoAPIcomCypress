import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsSchema from "../../contracts/products.contract";

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
        return productsSchema.validateAsync(res.body[i]);
      }
    });
  });

  it("Retrieve a product - Acceptance", () => {
    let productID = 385;
    cy.getProductsByID(tokenFixture.token, productID).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body.id).to.eq(productID);
      expect(res.body.name).to.eq("Xiaomi Redmi 4X");
      expect(res.body.type).to.eq("simple");
    });
  });

  it("Retrieve a product - Contract", () => {
    let productID = 385;
    cy.getProductsByID(tokenFixture.token, productID).then((res) => {
      return productsSchema.validateAsync(res.body);
    });
  });
});
