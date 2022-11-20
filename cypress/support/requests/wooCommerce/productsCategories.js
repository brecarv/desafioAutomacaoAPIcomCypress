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

Cypress.Commands.add("postProductsCategories", (token, name, image) => {
  cy.request({
    method: "POST",
    url: Cypress.env("wooCommerce") + Cypress.env("productsCategories"),
    headers: {
      Authorization: token,
    },
    body: {
      name: name,
      image: {
        src: image,
      },
    },
  });
});
