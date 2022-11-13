const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3",
    specPattern: "cypress/api/**/*.{js,jsx,ts,tsx}",
  },
});
