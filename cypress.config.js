const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      wooCommerce: "https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3",
      productsReviews: "/products/reviews",
    },
    specPattern: "cypress/api/**/*.{js,jsx,ts,tsx}",
  },
});
