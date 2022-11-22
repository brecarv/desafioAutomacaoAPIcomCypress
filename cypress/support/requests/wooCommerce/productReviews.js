Cypress.Commands.add("getProductsReviews", (token) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("productsReviews"),
    headers: {
      Authorization: token,
    },
  });
});

Cypress.Commands.add("getProductReviewByID", (token, id) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("productsReviews") + "/" + id,
    headers: {
      Authorization: token,
    },
  });
});

Cypress.Commands.add(
  "postProductReview",
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

Cypress.Commands.add(
  "putProductReviewByID",
  (token, id, reviewText, rating) => {
    cy.request({
      method: "PUT",
      url:
        Cypress.env("wooCommerce") + Cypress.env("productsReviews") + "/" + id,
      headers: {
        Authorization: token,
      },
      body: {
        review: reviewText,
        rating: rating,
      },
    });
  }
);

Cypress.Commands.add("deleteProductReviewByID", (token, id, force) => {
  cy.request({
    method: "DELETE",
    url:
      Cypress.env("wooCommerce") +
      Cypress.env("productsReviews") +
      "/" +
      id +
      "?force=" +
      force,
    headers: {
      Authorization: token,
    },
  });
});
