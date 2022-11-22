import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsSchema from "../../contracts/products.contract";

describe("Products", () => {
  let productName = faker.commerce.product();
  let productType = "simple";
  let productPrice = faker.commerce.price();
  let productDescription = faker.commerce.productDescription();
  let productShortDescription = productDescription.substring(
    1,
    productDescription.length / 2
  );
  let categoryID = 48;
  let productCategories = [{ id: categoryID }];

  it("List all products - Acceptance and Contract", () => {
    cy.getProducts(tokenFixture.token).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body).to.have.length.greaterThan(0);
      for (let i = 0; i < res.body.length; i++) {
        return productsSchema.validateAsync(res.body[i]);
      }
    });
  });

  it("Retrieve a product - Acceptance and Contract", () => {
    cy.postProducts(
      tokenFixture.token,
      productName,
      productType,
      productPrice,
      productDescription,
      productShortDescription,
      productCategories
    ).then((res) => {
      let productID = res.body.id;
      let force = true;
      cy.getProductsByID(tokenFixture.token, productID).then((res) => {
        expect(res.status).to.eq(StatusCodes.OK);
        expect(res.body.id).to.eq(productID);
        expect(res.body.name).to.eq(productName);
        expect(res.body.type).to.eq(productType);
        expect(res.body.regular_price).to.eq(productPrice);
        expect(res.body.description).to.include(productDescription);
        expect(res.body.short_description).to.include(productShortDescription);
        expect(res.body.categories[0]).to.have.any.property("id");
        return (
          productsSchema.validateAsync(res.body),
          cy.deleteProductsByID(tokenFixture.token, productID, force)
        );
      });
    });
  });

  it("Create a product - Acceptance and Contract", () => {
    cy.postProducts(
      tokenFixture.token,
      productName,
      productType,
      productPrice,
      productDescription,
      productShortDescription,
      productCategories
    ).then((res) => {
      let productID = res.body.id;
      let force = true;
      expect(res.status).to.eq(StatusCodes.CREATED);
      expect(res.body.name).to.eq(productName);
      expect(res.body.type).to.eq(productType);
      expect(res.body.regular_price).to.eq(productPrice);
      expect(res.body.description).to.include(productDescription);
      expect(res.body.short_description).to.eq(productShortDescription);
      expect(res.body.categories[0]).to.have.any.property("id");
      return (
        productsSchema.validateAsync(res.body),
        cy.deleteProductsByID(tokenFixture.token, productID, force)
      );
    });
  });

  it("Update a product - Acceptance and Contract", () => {
    cy.postProducts(
      tokenFixture.token,
      productName,
      productType,
      productPrice,
      productDescription,
      productShortDescription,
      productCategories
    ).then((res) => {
      let productID = res.body.id;
      let newProductPrice = Number(productPrice / 2).toString();
      let force = true;
      cy.putProductsByID(tokenFixture.token, productID, newProductPrice).then(
        (res) => {
          expect(res.status).to.eq(StatusCodes.OK);
          expect(res.body.price).to.eq(newProductPrice);
          return (
            productsSchema.validateAsync(res.body),
            cy.deleteProductsByID(tokenFixture.token, productID, force)
          );
        }
      );
    });
  });

  it("Delete a product - Acceptance and Contract", () => {
    cy.postProducts(
      tokenFixture.token,
      productName,
      productType,
      productPrice,
      productDescription,
      productShortDescription,
      productCategories
    ).then((res) => {
      let productID = res.body.id;
      let force = true;
      cy.deleteProductsByID(tokenFixture.token, productID, force).then(
        (res) => {
          expect(res.status).to.eq(StatusCodes.OK);
          expect(res.body.id).to.eq(productID);
          return productsSchema.validateAsync(res.body);
        }
      );
    });
  });
});
