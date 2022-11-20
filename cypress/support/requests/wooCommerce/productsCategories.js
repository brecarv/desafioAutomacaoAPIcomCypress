Cypress.Commands.add("getProductsCategories", (token) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("productsCategories"),
    headers: {
      Authorization: token,
    },
  });
});
