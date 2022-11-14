Cypress.Commands.add("getProductsReviews", (token) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("productsReviews"),
    headers: {
      Authorization: token,
    },
  });
});

Cypress.Commands.add("getProductsReviewsByID", (token, id) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("productsReviews") + "/" + id,
    headers: {
      Authorization: token,
    },
  });
});
