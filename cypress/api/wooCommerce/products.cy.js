import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";

import tokenFixture from "../../fixtures/token.json";

import productsSchema from "../../contracts/products.contract";

describe("Products", () => {
  let productName = faker.commerce.product();
  let productType = "simple";
  let productPrice = faker.commerce.price();
  let productDescription = faker.commerce.productDescription();
  console.log("antes:" + productDescription);
  let productShortDescription = productDescription.substring(
    1,
    productDescription.length / 2
  );
  let categoryID = 48;
  let productCategories = [{ id: categoryID }];
  console.log("depois:" + productDescription);

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

  it("Create a product - Acceptance", () => {
    cy.postProducts(
      tokenFixture.token,
      productName,
      productType,
      productPrice,
      productDescription,
      productShortDescription,
      productCategories
    ).then((res) => {
      expect(res.status).to.eq(StatusCodes.CREATED);
      expect(res.body.name).to.eq(productName);
      expect(res.body.type).to.eq(productType);
      expect(res.body.regular_price).to.eq(productPrice);
      expect(res.body.description).to.include(productDescription);
      expect(res.body.short_description).to.eq(productShortDescription);
      expect(res.body.categories[0]).to.have.any.property("id");
    });
  });

  it("Create a product - Contract", () => {
    cy.postProducts(
      tokenFixture.token,
      productName,
      productType,
      productPrice,
      productDescription,
      productShortDescription,
      productCategories
    ).then((res) => {
      return productsSchema.validateAsync(res.body);
    });
  });

  it("Update a product - Acceptance", () => {
    let productID = 5117;
    cy.putProductsByID(tokenFixture.token, productID, productPrice).then(
      (res) => {
        expect(res.status).to.eq(StatusCodes.OK);
        expect(res.body.price).to.eq(productPrice);
      }
    );
  });

  it("Update a product - Contract", () => {
    let productID = 5117;
    cy.putProductsByID(tokenFixture.token, productID, productPrice).then(
      (res) => {
        return productsSchema.validateAsync(res.body);
      }
    );
  });

  it.skip("Delete a product - Acceptance", () => {
    let productID = 5110;
    let force = true;
    cy.deleteProductsByID(tokenFixture.token, productID, force).then((res) => {
      expect(res.status).to.eq(StatusCodes.OK);
      expect(res.body.id).to.eq(productID);
    });
  });

  it.skip("Delete a product - Acceptance", () => {
    let productID = 5111;
    let force = true;
    cy.deleteProductsByID(tokenFixture.token, productID, force).then((res) => {
      return productsSchema.validateAsync(res.body);
    });
  });
});
