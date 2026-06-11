describe('MAKISHOP - Crear Cliente', () => {
  beforeEach(() => {
    cy.visit('/web/login')
    cy.get('#login').clear().type('admin@makishop.local')
    cy.get('#password').clear().type('Makishop2026')
    cy.get('form .btn-primary[type="submit"]').click()
    cy.url().should('include', '/odoo')
  })

  it('Crear nuevo cliente en CRM', () => {
    cy.fixture('example').then((datos) => {
      cy.visit('/odoo/contacts/new')

      // Esperar que cargue el formulario
      cy.get('.o_form_view').should('be.visible')

      // Seleccionar tipo Empresa
      cy.get('input[data-value="company"]').click({force: true})

      // Nombre de la empresa
      cy.get('.o_field_widget[name="name"] input')
        .clear().type(datos.cliente.empresa)

      // Email
      cy.get('.o_field_widget[name="email"] input')
        .clear().type(datos.cliente.email)

      // Teléfono
      cy.get('.o_field_widget[name="phone"] input')
        .clear().type(datos.cliente.telefono)

      // Guardar
      cy.get('.o_form_button_save').click()

      // Verificar que se guardó
      cy.contains(datos.cliente.empresa).should('be.visible')
    })
  })
})