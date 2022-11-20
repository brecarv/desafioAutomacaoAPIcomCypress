import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsCategoriesSchema from "../../contracts/productsCategories.contract";

describe("Product Categories", () => {
  let name = "a";
  let image =
    "https://cena.reset.cwi.com.br/wp-content/uploads/2022/11/T_2_front-62.jpg";

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

  it.only("Retrieve a product category - Acceptance", () => {
    let categoryID = 396;
    cy.getProductsCategoriesByID(tokenFixture.token, categoryID).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body.name).to.eq(name);
      expect(res.body.image.src).to.eq(image);
    });
  });

  it.only("Retrieve a product category - Contract", () => {
    let categoryID = 396;
    cy.getProductsCategoriesByID(tokenFixture.token, categoryID).then((res) => {
      return productsCategoriesSchema.validateAsync(res.body);
    });
  });
});
