describe('MAKISHOP - Login', () => {
  beforeEach(() => {
    cy.visit('/web/login')
  })

  it('Login exitoso con credenciales válidas', () => {
    cy.get('#login').clear().type('admin@makishop.local')
    cy.get('#password').clear().type('contraseña_incorrecta')
    cy.get('form .btn-primary[type="submit"]').click()
    cy.get('.alert').should('be.visible')
  })

  it('Login fallido con contraseña incorrecta', () => {
    cy.get('#login').clear().type('admin')
    cy.get('#password').clear().type('contraseña_incorrecta')
    cy.get('form .btn-primary[type="submit"]').click()
    cy.get('.alert').should('be.visible')
  })
})