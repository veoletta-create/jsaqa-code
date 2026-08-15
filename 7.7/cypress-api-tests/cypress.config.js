const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "vasfk7",
  e2e: {
    supportFile: false,
    baseUrl: 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {},
  },
});