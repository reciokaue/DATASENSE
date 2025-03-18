describe('Login Journey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('should logging successful', () => {
    cy.getByData('input-email').type('datasense@gmail.com')
    cy.getByData('input-password').type('Senha123')

    cy.getByData('button-login').click()
    cy.get('.Toastify__toast-container').should('exist')

    cy.location('pathname').should('equal', '/home')
    cy.getCookie('datasense-token').should('exist')
  })

  it.only('should error because wrong password', () => {
    cy.getByData('input-email').type('datasense@gmail.com')
    cy.getByData('input-password').type('wrong-password')

    cy.getByData('button-login').click()
    cy.get('.Toastify__toast-container')
      .should('exist')
      .contains('Senha incorreta')

    cy.location('pathname').should('equal', '/login')
    cy.getCookie('datasense-token').should('not.exist')
  })
})
