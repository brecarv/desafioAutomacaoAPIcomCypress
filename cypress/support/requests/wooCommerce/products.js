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
