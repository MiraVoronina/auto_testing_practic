describe('Создание потребности', () => {

    it('Позитивный сценарий — работодатель авторизуется и создаёт потребность', () => {
        cy.visit('https://dev.profteam.su/login');

        cy.get('input[type=text]').type('testerInstitution');
        cy.get('input[type=password]').type('Password1');
        cy.get('button[type=submit]').eq(2).click();

        cy.get(':nth-child(6) > .menu-item__item-name').click();
        cy.get('[data-v-99600bb6=""][data-v-4849dea2=""] > .needs-block > .needs-block__content > .needs-block__filters-wrapper > .button').click();

        cy.get('.vacancy-need-wrapper > .form').should('be.visible');

        cy.get('.vacancy-need-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(1) > .form-control--responsive > .form-input--text',{ timeout: 10000 })
            .first().type('Разнорабочий', { force: true });

        cy.get('.vacancy-need-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(2) > .salary-field > .salary-field__wrapper--bottom > .radio-list > :nth-child(2)')
            .click({ multiple: true, force: true });

        cy.get('.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(3) > div > textarea[placeholder="Обязанности сотрудника"]',{ timeout: 10000 })
            .eq(0).should('be.visible').type('Тестирование интерфейсов', { force: true });

        cy.get('.vacancy-need-wrapper > form > div:nth-child(1) > div.form__labels > div > div:nth-child(4) > div > textarea[placeholder="Ваши требования"]',{ timeout: 10000 })
            .eq(0).should('be.visible').type('Ответственность, внимание к деталям', { force: true });

        cy.get('.vacancy-need-wrapper > .form > .form__buttons > .button').eq(1).click({ force: true });
    });

    it('Негативный сценарий — работодатель пытается создать пустую потребность', () => {
        cy.visit('https://dev.profteam.su/login');

        cy.get('input[type=text]').type('testerInstitution');
        cy.get('input[type=password]').type('Password1');
        cy.get('button[type=submit]').eq(2).click();

        cy.get(':nth-child(6) > .menu-item__item-name').click();
        cy.get('[data-v-99600bb6=""][data-v-4849dea2=""] > .needs-block > .needs-block__content > .needs-block__filters-wrapper > .button').click();

        cy.get('.vacancy-need-wrapper > .form').should('be.visible');

        cy.intercept('POST', '/api/needs').as('createNeed');
        cy.get('.vacancy-need-wrapper > .form > .form__buttons > .button').eq(1).click({ force: true });
        cy.wait('@createNeed').its('response.statusCode').should('eq', 422);
    });

});
