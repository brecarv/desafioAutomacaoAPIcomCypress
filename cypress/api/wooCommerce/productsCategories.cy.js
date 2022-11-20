import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsCategoriesSchema from "../../contracts/productsCategories.contract";

describe("Product Categories", () => {
  let name = "Test2011";

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

  it("Retrieve a product category - Acceptance", () => {
    let categoryID = 534;
    cy.getProductsCategoriesByID(tokenFixture.token, categoryID).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body.name).to.eq(name);
      expect(res.body.image).to.eq(null);
    });
  });

  it("Retrieve a product category - Contract", () => {
    let categoryID = 534;
    cy.getProductsCategoriesByID(tokenFixture.token, categoryID).then((res) => {
      return productsCategoriesSchema.validateAsync(res.body);
    });
  });

  it.skip("Create a product category - Acceptance", () => {
    cy.postProductsCategories(tokenFixture.token, name).then((res) => {
      expect(res.status).to.eq(StatusCodes.CREATED);
      expect(res.body.name).to.eq(name);
    });
  });

  it.skip("Create a product category - Contract", () => {
    cy.postProductsCategories(tokenFixture.token, "CamisetaTestHoje").then(
      (res) => {
        return productsCategoriesSchema.validateAsync(res.body);
      }
    );
  });
});
