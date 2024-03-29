const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      wooCommerce: "https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3",
      products: "/products",
      productsReviews: "/products/reviews",
      productsCategories: "/products/categories",
    },
    specPattern: "cypress/api/**/*.{js,jsx,ts,tsx}",
  },
});
