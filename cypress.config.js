const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dev.profteam.su',
    supportFile: 'cypress/support/e2e.js',
    experimentalModifyObstructiveThirdPartyCode: true
  }
});
