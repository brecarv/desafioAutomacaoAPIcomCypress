Cypress.Commands.add("getProductsReviews", (token) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("productsReviews"),
    headers: {
      Authorization: token,
    },
  });
});
