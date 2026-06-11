Cypress.on('uncaught:exception', () => false)

describe('MAKISHOP - Crear Órdenes de Compra', () => {

  const compras = [
    { proveedor: 'Carlos', producto: 'Laptop', cantidad: '10', precio: '2800' },
    { proveedor: 'Ana', producto: 'Monitor', cantidad: '5', precio: '1400' },
    { proveedor: 'Roberto', producto: 'Teclado', cantidad: '15', precio: '300' },
    { proveedor: 'María', producto: 'Memoria', cantidad: '20', precio: '220' },
    { proveedor: 'Jorge', producto: 'SSD', cantidad: '10', precio: '300' },
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

  it('Crear 5 órdenes de compra', () => {
    compras.forEach((compra) => {
      cy.log(`Creando compra a: ${compra.proveedor}`)
      cy.visit('/odoo/purchase/new')
      cy.get('.o_form_view', { timeout: 30000 }).should('be.visible')
      cy.wait(3000)

      // Proveedor
      cy.get('.o_field_widget[name="partner_id"] input')
        .clear({ force: true })
        .type(compra.proveedor, { force: true })
      cy.wait(2000)
      cy.get('.o_field_many2one_selection .dropdown-item', { timeout: 10000 })
        .first().click()
      cy.wait(2000)

      // Agregar producto
      cy.contains('Agregar un producto').click()
      cy.wait(1500)

      cy.get('.o_field_widget[name="product_id"] input')
        .first()
        .click({ force: true })
        .type(compra.producto)
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