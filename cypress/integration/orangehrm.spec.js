describe('OrangeHRM Login', () => {
		it('should login into OrangeHRM', () => {
				cy.visit('https://opensource-demo.orangehrmlive.com/');

				cy.get('#txtUsername').type('Admin');
				cy.get('#txtPassword').type('admin123');
				cy.get('#btnLogin').click();
		});
});

