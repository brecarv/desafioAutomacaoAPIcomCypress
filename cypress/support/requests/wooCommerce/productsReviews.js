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

Cypress.Commands.add(
  "postProductsReviews",
  (token, productId, reviewText, author, authorEmail, rating) => {
    cy.request({
      method: "POST",
      url: Cypress.env("wooCommerce") + Cypress.env("productsReviews"),
      headers: {
        Authorization: token,
      },
      body: {
        product_id: productId,
        review: reviewText,
        reviewer: author,
        reviewer_email: authorEmail,
        rating: rating,
      },
    });
  }
);
