describe('Переход студента в потребность', () => {
    beforeEach(() => {
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').first().type('testerStudentt');
        cy.get('input[type="password"]').type('Password1');
        cy.contains('button', 'Войти').click();
        cy.url().should('include', '/account');
    });

    it('Кликает на карточку потребности или кнопку "Подробнее"', () => {
        cy.visit('https://dev.profteam.su/needs');
        cy.wait(1500);

        cy.contains('Подробнее').first().click();
        
        cy.url().should('include', '/need/');
    });
});
