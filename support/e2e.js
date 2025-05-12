import 'cypress-real-events/support';

Cypress.on('window:before:load', (win) => {
    Object.defineProperty(win.navigator, 'webdriver', {
        get: () => false,
    });
});
