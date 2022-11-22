import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsCategoriesSchema from "../../contracts/productsCategories.contract";

describe("Product Categories", () => {
  let name = faker.word.adjective();
  let description = faker.commerce.productName();

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
    cy.postProductsCategories(tokenFixture.token, name).then((res) => {
      let categoryID = res.body.id;
      cy.getProductsCategoriesByID(tokenFixture.token, categoryID).then(
        (res) => {
          expect(res.status).to.eq(StatusCodes.OK);
          expect(res.body.name).to.eq(name);
          expect(res.body.image).to.eq(null);
          return cy.deleteProductsCategoriesByID(
            tokenFixture.token,
            categoryID,
            true
          );
        }
      );
    });
  });

  it("Retrieve a product category - Contract", () => {
    cy.postProductsCategories(tokenFixture.token, name).then((res) => {
      let categoryID = res.body.id;
      let force = true;
      cy.getProductsCategoriesByID(tokenFixture.token, categoryID).then(
        (res) => {
          return (
            productsCategoriesSchema.validateAsync(res.body),
            cy.deleteProductsCategoriesByID(
              tokenFixture.token,
              categoryID,
              force
            )
          );
        }
      );
    });
  });

  it("Create a product category - Acceptance", () => {
    cy.postProductsCategories(tokenFixture.token, name).then((res) => {
      let categoryID = res.body.id;
      let force = true;
      expect(res.status).to.eq(StatusCodes.CREATED);
      expect(res.body.name).to.eq(name);
      return cy.deleteProductsCategoriesByID(
        tokenFixture.token,
        categoryID,
        force
      );
    });
  });

  it("Create a product category - Contract", () => {
    cy.postProductsCategories(tokenFixture.token, name).then((res) => {
      let categoryID = res.body.id;
      let force = true;
      return (
        productsCategoriesSchema.validateAsync(res.body),
        cy.deleteProductsCategoriesByID(tokenFixture.token, categoryID, force)
      );
    });
  });

  it.only("Update a product category - Acceptance and Contract", () => {
    cy.postProductsCategories(tokenFixture.token, name).then((res) => {
      let categoryID = res.body.id;
      cy.putProductsCategoriesByID(
        tokenFixture.token,
        categoryID,
        description
      ).then((res) => {
        expect(res.status).to.eq(StatusCodes.OK);
        expect(res.body.description).to.eq(description);
        let force = true;
        return (
          productsCategoriesSchema.validateAsync(res.body),
          cy.deleteProductsCategoriesByID(tokenFixture.token, categoryID, force)
        );
      });
    });
  });

  it.only("Delete a product category - Acceptance and Contract", () => {
    cy.postProductsCategories(tokenFixture.token, name).then((res) => {
      let categoryID = res.body.id;
      let force = true;
      cy.deleteProductsCategoriesByID(
        tokenFixture.token,
        categoryID,
        force
      ).then((res) => {
        expect(res.status).to.eq(StatusCodes.OK);
        expect(res.body.id).to.eq(categoryID);
        return productsCategoriesSchema.validateAsync(res.body);
      });
    });
  });
});
