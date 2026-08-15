const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "fehcir",
  e2e: {
    baseUrl: 'http://qamid.tmweb.ru',
    setupNodeEvents(on, config) {
    },
  },
});