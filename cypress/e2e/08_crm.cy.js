Cypress.on('uncaught:exception', () => false)

describe('MAKISHOP - CRM Leads', () => {

  const leads = [
    { nombre: 'Consulta Laptop Gaming', telefono: '+502 5534-2210' },
    { nombre: 'Cotización Monitor 4K', telefono: '+502 4421-8876' },
    { nombre: 'Compra Teclado y Mouse', telefono: '+502 3312-9945' },
    { nombre: 'Upgrade RAM Computadora', telefono: '+502 5678-1234' },
    { nombre: 'Consulta SSD para Laptop', telefono: '+502 4455-6677' },
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

  it('Crear 5 leads en CRM', () => {
    leads.forEach((lead) => {
      cy.log(`Creando lead: ${lead.nombre}`)
      cy.visit('/odoo/crm')
      cy.get('.o_kanban_view', { timeout: 30000 }).should('be.visible')
      cy.wait(2000)

      // Clic en Nuevo
      cy.contains('Nuevo').first().click()
      cy.wait(1500)

      // Escribir nombre en el popup
      cy.get('.o_field_widget[name="name"] input, input[placeholder="Nombre de la oportunidad"]')
        .first()
        .clear({ force: true })
        .type(lead.nombre, { force: true })
      cy.wait(500)

      // Teléfono en popup
      cy.get('input[placeholder="Teléfono del contacto"]')
        .clear({ force: true })
        .type(lead.telefono, { force: true })
      cy.wait(500)

      // Clic en Agregar
      cy.contains('Agregar').click()
      cy.wait(2000)
    })
  })
})