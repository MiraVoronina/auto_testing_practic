describe('Смена статуса потребности работодателем', () => {
    beforeEach(() => {
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').first().type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.contains('button', 'Войти').click();
        cy.url().should('include', '/account');
    });

    it('Публикация потребности', () => {
        cy.visit('https://dev.profteam.su/account/needs');
        cy.wait(1500);

        cy.contains('Опубликовать').scrollIntoView().should('exist');
        cy.contains('Опубликовать').click({ force: true });

        cy.wait(1000);
    });
});
