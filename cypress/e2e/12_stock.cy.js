Cypress.on('uncaught:exception', () => false)

describe('MAKISHOP - Actualizar Stock de Productos', () => {

  const stocks = [
    { id: '9', cantidad: '15' },
    { id: '10', cantidad: '50' },
    { id: '11', cantidad: '30' },
    { id: '12', cantidad: '10' },
    { id: '13', cantidad: '20' },
    { id: '14', cantidad: '40' },
    { id: '16', cantidad: '25' },
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

  it('Actualizar stock de 7 productos', () => {
    stocks.forEach((item) => {
      cy.log(`Actualizando stock producto ID: ${item.id}`)

      // Ir directo a la página de stock del producto
      cy.visit(`/odoo/purchase-products/${item.id}/action-500/stock-locations`)
      cy.wait(3000)

      // Clic en Actualizar cantidad
      cy.contains('Actualizar cantidad', { timeout: 15000 }).click()
      cy.wait(2000)

      // Ingresar cantidad
      cy.get('.o_field_widget[name="inventory_quantity"] input', { timeout: 10000 })
        .first().clear({ force: true }).type(item.cantidad, { force: true })
      cy.wait(500)

      // Aplicar
      cy.contains('Aplicar todo', { timeout: 10000 }).click({ force: true })
      cy.wait(2000)
    })
  })
})