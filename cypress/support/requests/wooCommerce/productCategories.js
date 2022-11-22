Cypress.Commands.add("getProductCategories", (token) => {
  cy.request({
    method: "GET",
    url: Cypress.env("wooCommerce") + Cypress.env("productsCategories"),
    headers: {
      Authorization: token,
    },
  });
});

Cypress.Commands.add("getProductCategoriesByID", (token, id) => {
  cy.request({
    method: "GET",
    url:
      Cypress.env("wooCommerce") + Cypress.env("productsCategories") + "/" + id,
    headers: {
      Authorization: token,
    },
  });
});

Cypress.Commands.add("postProductCategories", (token, name, image) => {
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

Cypress.Commands.add("putProductCategoriesByID", (token, id, description) => {
  cy.request({
    method: "PUT",
    url:
      Cypress.env("wooCommerce") + Cypress.env("productsCategories") + "/" + id,
    headers: {
      Authorization: token,
    },
    body: {
      description: description,
    },
  });
});

Cypress.Commands.add("deleteProductCategoriesByID", (token, id, force) => {
  cy.request({
    method: "DELETE",
    url:
      Cypress.env("wooCommerce") +
      Cypress.env("productsCategories") +
      "/" +
      id +
      "?force=" +
      force,
    headers: {
      Authorization: token,
    },
  });
});
