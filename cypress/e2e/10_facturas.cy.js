Cypress.on('uncaught:exception', () => false)

describe('MAKISHOP - Crear Facturas', () => {

  const facturas = [
    { cliente: 'Carlos', producto: 'Laptop', precio: '3500' },
    { cliente: 'Ana', producto: 'Monitor', precio: '1800' },
    { cliente: 'Roberto', producto: 'Teclado', precio: '450' },
    { cliente: 'María', producto: 'Memoria', precio: '320' },
    { cliente: 'Jorge', producto: 'SSD', precio: '420' },
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

  it('Crear 5 facturas', () => {
    facturas.forEach((factura) => {
      cy.log(`Creando factura para: ${factura.cliente}`)
      cy.visit('/odoo/customer-invoices/new')
      cy.get('.o_form_view', { timeout: 30000 }).should('be.visible')
      cy.wait(3000)

      // Cliente
      cy.get('.o_field_widget[name="partner_id"] input')
        .clear({ force: true })
        .type(factura.cliente, { force: true })
      cy.wait(2000)
      cy.get('.o_field_many2one_selection .dropdown-item', { timeout: 10000 })
        .first().click()
      cy.wait(2000)

      // Agregar línea de producto
      cy.contains('Agregar una línea').click()
      cy.wait(1500)

      // Producto
      cy.get('.o_field_widget[name="product_id"] input')
        .first()
        .click({ force: true })
        .type(factura.producto)
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