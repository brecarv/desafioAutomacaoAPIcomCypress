Cypress.Commands.add("getProducts", (token) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("products"),
    headers: {
      Authorization: token,
    },
  });
});

Cypress.Commands.add("getProductsByID", (token, id) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("products") + "/" + id,
    headers: {
      Authorization: token,
    },
  });
});

Cypress.Commands.add(
  "postProducts",
  (
    token,
    name,
    type,
    regular_price,
    description,
    short_description,
    categories
  ) => {
    cy.request({
      method: "POST",
      url: Cypress.env("wooCommerce") + Cypress.env("products"),
      headers: {
        Authorization: token,
      },
      body: {
        name: name,
        type: type,
        regular_price: regular_price,
        description: description,
        short_description: short_description,
        categories: categories,
      },
    });
  }
);

Cypress.Commands.add("putProductsByID", (token, id, regular_price) => {
  cy.request({
    method: "PUT",
    url: Cypress.env("wooCommerce") + Cypress.env("products") + "/" + id,
    headers: {
      Authorization: token,
    },
    body: {
      regular_price: regular_price,
    },
  });
});

Cypress.Commands.add("deleteProductsByID", (token, id, force) => {
  cy.request({
    method: "DELETE",
    url:
      Cypress.env("wooCommerce") +
      Cypress.env("products") +
      "/" +
      id +
      "?force=" +
      force,
    headers: {
      Authorization: token,
    },
  });
});
