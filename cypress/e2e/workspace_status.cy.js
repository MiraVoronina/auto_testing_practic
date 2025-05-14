describe('Изменение статуса в рабочем пространстве', () => {
    beforeEach(() => {
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').first().type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.contains('button', 'Войти').click();
        cy.url().should('include', '/account');

        cy.visit('https://dev.profteam.su/account/responses');
        cy.wait(1500); 
    });

    it('Устанавливает статус "Принят на вакансию"', () => {
        cy.get('.responses-list-item').filter(':contains("Дегустатор вина")')
            .contains('Рабочее пространство').click();

        cy.url().should('include', '/workspace');
        cy.contains('Принят на вакансию').click();
        cy.contains('Принят на вакансию').should('exist');
    });

    it('Устанавливает статус "Потребность не выполнена" (отказ)', () => {
        cy.contains('.responses-list-item__title', 'ллллл')
            .closest('.responses-list-item')
            .contains('Рабочее пространство')
            .click();

        cy.url().should('include', '/workspace');

        cy.wait(3000);

        cy.contains('В вакансии отказано', { timeout: 15000 }).should('exist');

        cy.contains('В вакансии отказано').click({ force: true });
    });
});
