
describe('Поиск и фильтрация потребностей', () => {
    it('Гость — поиск по названию (позитивный)', () => {
        cy.visit('https://dev.profteam.su/needs');
        cy.get('input[placeholder="Название..."]').should('be.visible').clear().type('Кладовщик');
        cy.get('button.search-input__button').first().click();
        cy.get('.need-item').should('contain', 'Кладовщик');
    });

    it('Гость — поиск по названию (негативный)', () => {
        cy.visit('https://dev.profteam.su/needs');
        cy.get('input[placeholder="Название..."]').should('be.visible').clear().type('абракадабра123');
        cy.get('button.search-input__button').first().click();
        cy.get('.need-item').should('have.length', 0);
    });

    ['По диапазону', 'По договорённости', 'Любой'].forEach(option => {
        it(`Гость — фильтрация по зарплате "${option}"`, () => {
            cy.visit('https://dev.profteam.su/needs');
            cy.contains('label', option).find('input[type="radio"]').check({ force: true });
            cy.get('.need-item').should('exist');
        });
    });
});
