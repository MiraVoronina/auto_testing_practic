describe('Взаимодействие в рабочем пространстве (Дегустатор вина)', () => {
    beforeEach(() => {
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').first().type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.contains('button', 'Войти').click();
        cy.url().should('include', '/account');

        cy.visit('https://dev.profteam.su/account/responses');
        cy.wait(1500);

        cy.contains('.responses-list-item', 'Дегустатор вина')
            .contains('Рабочее пространство').click();

        cy.url().should('include', '/workspace');
    });

    it('Добавление вложения (маленький файл)', () => {
        cy.get('input[type="file"]#file-uploader')
            .selectFile('cypress/fixtures/35013.jpg', { force: true });

        cy.contains('35013.jpg').should('exist');

        cy.get('textarea').type('маленький файл', { force: true });
        cy.get('.comment-textarea__buttons .icon-button').eq(1)
            .should('not.be.disabled')
            .click();

        cy.contains('маленький файл', { timeout: 10000 }).should('exist');
    });

    it('Добавление вложения (большой файл)', () => {
        cy.get('input[type="file"]#file-uploader')
            .selectFile('cypress/fixtures/2151773881.jpg', { force: true });

        cy.contains('2151773881.jpg').should('exist');

        cy.get('textarea').type('большой файл', { force: true });
        cy.get('.comment-textarea__buttons .icon-button').eq(1)
            .should('not.be.disabled')
            .click();

        cy.contains('2151773881.jpg', { timeout: 10000 }).should('exist');
    });

    it('Добавление обычного комментария', () => {
        cy.get('textarea').type('Комментарий', { force: true });
        cy.get('.comment-textarea__buttons .icon-button').eq(1).click();
        cy.contains('Комментарий').should('exist');
    });

    it('Добавление длинного комментария (максимум)', () => {
        const longText = 'x'.repeat(1000);
        cy.get('textarea').type(longText, { force: true });
        cy.get('.comment-textarea__buttons .icon-button').eq(1).click();
        cy.contains(longText.slice(0, 20)).should('exist');
    });

    it('Негативный тест: пустой комментарий', () => {
        cy.get('textarea').clear({ force: true });
        cy.get('.comment-textarea__buttons .icon-button').eq(1).click({ force: true });
        cy.get('textarea').should('have.attr', 'placeholder', 'Напишите комментарий...');
    });

    it('Ответ на комментарий', () => {
        cy.get('.detailed-workspace-activity-comments__action')
            .contains('Ответить').first().click();
        cy.get('textarea').type('Ответ на комментарий', { force: true });
        cy.get('.comment-textarea__buttons .icon-button').eq(1).click();
        cy.contains('Ответ на комментарий').should('exist');
    });
});
