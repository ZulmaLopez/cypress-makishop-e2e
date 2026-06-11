Cypress.on('uncaught:exception', () => false)

describe('MAKISHOP - Crear Órdenes de Venta', () => {

  const ventas = [
    { cliente: 'Carlos', producto: 'Laptop' },
    { cliente: 'Ana', producto: 'Monitor' },
    { cliente: 'Roberto', producto: 'Teclado' },
    { cliente: 'María', producto: 'Memoria' },
    { cliente: 'Jorge', producto: 'SSD' },
  ]

  beforeEach(() => {
    cy.visit('/web/login?redirect=/odoo')
    cy.wait(2000)
    cy.get('#login', { timeout: 15000 }).should('be.visible').clear().type('admin@makishop.local')
    cy.get('#password').clear().type('Makishop2026')
    cy.get('form .btn-primary[type="submit"]').click()
    cy.url().should('include', '/odoo')
    cy.wait(3000)
  })

  it('Crear 5 órdenes de venta', () => {
    ventas.forEach((venta) => {
      cy.log(`Creando venta para: ${venta.cliente}`)
      cy.visit('/odoo/sales/new')
      cy.get('.o_form_view', { timeout: 30000 }).should('be.visible')
      cy.wait(3000)

      // Cliente
      cy.get('.o_field_widget[name="partner_id"] input')
        .clear({ force: true })
        .type(venta.cliente, { force: true })
      cy.wait(2000)
      cy.get('.o_field_many2one_selection .dropdown-item', { timeout: 10000 })
        .first().click()
      cy.wait(2000)

      // Agregar producto
      cy.contains('Agregar un producto').click()
      cy.wait(2000)

      cy.get('div[name="product_template_id"] input.o_input')
        .should('exist')
        .click({ force: true })
        .type(venta.producto)
      cy.wait(1500)
      cy.get('.o_field_many2one_selection .dropdown-item', { timeout: 10000 })
        .first().click()
      cy.wait(1000)

      // Guardar
      cy.get('.o_form_button_save').click()
      cy.wait(3000)
    })
  })
})