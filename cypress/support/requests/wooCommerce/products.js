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
