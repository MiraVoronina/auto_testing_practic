describe('Подтверждение и отклонение отклика работодателем', () => {
    beforeEach(() => {
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').first().type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.contains('button', 'Войти').click();
        cy.url().should('include', '/account');
    });

    it('Подтверждение отклика', () => {
        cy.visit('https://dev.profteam.su/account/responses');
        cy.wait(1500);

        // Нажимаем первую кнопку в карточке (подтверждение)
        cy.get('.responses-list-item').first()
            .find('button')
            .eq(0)
            .click({ force: true });
    });

    it('Отклонение отклика', () => {
        cy.visit('https://dev.profteam.su/account/responses');
        cy.wait(1500);

        // Нажимаем вторую кнопку в карточке (отклонение)
        cy.get('.responses-list-item').first()
            .find('button')
            .click({ force: true });
    });
});
