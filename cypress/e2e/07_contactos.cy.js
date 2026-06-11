Cypress.on('uncaught:exception', () => false)

describe('MAKISHOP - Crear Contactos', () => {

  const contactos = [
    { nombre: 'Carlos Mendoza', email: 'cmendoza@gmail.com', telefono: '+502 5534-2210', ciudad: 'Guatemala' },
    { nombre: 'Ana García', email: 'agarcia@hotmail.com', telefono: '+502 4421-8876', ciudad: 'Cobán' },
    { nombre: 'Roberto Pérez', email: 'rperez@empresa.gt', telefono: '+502 3312-9945', ciudad: 'Quetzaltenango' },
    { nombre: 'María López', email: 'mlopez@gmail.com', telefono: '+502 5678-1234', ciudad: 'Antigua Guatemala' },
    { nombre: 'Jorge Hernández', email: 'jhernandez@outlook.com', telefono: '+502 4455-6677', ciudad: 'Escuintla' },
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

  it('Crear 5 clientes en contactos', () => {
    contactos.forEach((contacto) => {
      cy.log(`Creando contacto: ${contacto.nombre}`)
      cy.visit('/odoo/contacts/new')
      cy.get('.o_form_view', { timeout: 30000 }).should('be.visible')
      cy.wait(3000)

      // Tipo persona
      cy.get('input[data-value="person"]').click({ force: true })
      cy.wait(1000)

      // Nombre — re-obtener después del re-render
      cy.get('.o_field_widget[name="name"] input').clear({ force: true })
      cy.wait(500)
      cy.get('.o_field_widget[name="name"] input').type(contacto.nombre, { force: true, delay: 50 })
      cy.wait(1000)
      cy.get('body').click(0, 0)
      cy.wait(500)

      // Email
      cy.get('.o_field_widget[name="email"] input').clear().type(contacto.email)
      cy.wait(300)

      // Teléfono
      cy.get('.o_field_widget[name="phone"] input').clear().type(contacto.telefono)
      cy.wait(300)

      // Ciudad
      cy.get('.o_field_widget[name="city"] input').clear().type(contacto.ciudad)
      cy.wait(300)

      // Guardar
      cy.get('.o_form_button_save').click()
      cy.wait(3000)
    })
  })
})