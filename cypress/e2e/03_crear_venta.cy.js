describe('MAKISHOP - Crear Orden de Venta', () => {
  beforeEach(() => {
    cy.visit('/web/login')
    cy.get('#login').clear().type('admin@makishop.local')
    cy.get('#password').clear().type('Makishop2026')
    cy.get('form .btn-primary[type="submit"]').click()
    cy.url().should('include', '/odoo')
  })

  it('Crear cotización de venta para cliente', () => {
    cy.fixture('example').then((datos) => {
      cy.visit('/odoo/sales/new')

      // Esperar formulario
      cy.get('.o_form_view').should('be.visible')

      // Seleccionar cliente
      cy.get('.o_field_widget[name="partner_id"] input')
        .type(datos.cliente.nombre)
      cy.get('.o_field_many2one_selection .dropdown-item')
        .first().click()

      // Esperar que cargue tras seleccionar cliente
      cy.wait(2000)

      // Agregar línea de producto
      cy.contains('Agregar un producto').click()

      // Esperar fila nueva
      cy.wait(1500)

      // Input del producto usando el selector exacto
      cy.get('div[name="product_template_id"] input.o_input')
        .should('exist')
        .click({force: true})
        .type(datos.producto.nombre)

      // Esperar dropdown y seleccionar
      cy.get('.o_field_many2one_selection .dropdown-item', { timeout: 10000 })
        .first().click()

      // Guardar
      cy.get('.o_form_button_save').click()

      // Verificar estado de la cotización
      cy.get('.o_statusbar_status').should('be.visible')
    })
  })
})