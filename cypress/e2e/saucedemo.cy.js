describe('Automatización SauceDemo', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Login válido', () => {

    cy.get('[data-test="username"]').type('standard_user')

    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
  })

  it('Login inválido', () => {

    cy.get('[data-test="username"]').type('usuario_falso')

    cy.get('[data-test="password"]').type('123456')

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('contain', 'Username and password do not match')
  })

  it('Compra completa', () => {

    cy.get('[data-test="username"]').type('standard_user')

    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Juan')

    cy.get('[data-test="lastName"]').type('Perez')

    cy.get('[data-test="postalCode"]').type('01001')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="finish"]').click()

    cy.get('.complete-header')
      .should('contain', 'Thank you for your order!')
  })

})