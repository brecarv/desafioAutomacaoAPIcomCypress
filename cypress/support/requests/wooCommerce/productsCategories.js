Cypress.Commands.add("getProductsCategories", (token) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("productsCategories"),
    headers: {
      Authorization: token,
    },
  });
});

Cypress.Commands.add("getProductsCategoriesByID", (token, id) => {
  cy.request({
    method: "GET",
    url:
      Cypress.env("wooCommerce") + Cypress.env("productsCategories") + "/" + id,
    headers: {
      Authorization: token,
    },
  });
});
