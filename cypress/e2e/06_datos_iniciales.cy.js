describe('MAKISHOP - Carga de datos iniciales', () => {

  // Ignorar errores internos de Odoo
  Cypress.on('uncaught:exception', (err) => {
    return false
  })

  const productos = [
    { nombre: 'Laptop HP 15"', precio: '3500', costo: '2800' },
    { nombre: 'Mouse Inalámbrico Logitech', precio: '185', costo: '120' },
    { nombre: 'Teclado Mecánico Redragon', precio: '450', costo: '300' },
    { nombre: 'Monitor LG 24" Full HD', precio: '1800', costo: '1400' },
    { nombre: 'Audífonos Sony WH-1000', precio: '950', costo: '700' },
    { nombre: 'Memoria RAM 8GB DDR4', precio: '320', costo: '220' },
    { nombre: 'SSD 480GB Kingston', precio: '420', costo: '300' },
  ]

  const login = () => {
    cy.visit('/web/login?redirect=/odoo')
    cy.wait(2000)
    cy.get('#login', { timeout: 15000 }).should('be.visible').clear().type('admin@makishop.local')
    cy.get('#password').clear().type('Makishop2026')
    cy.get('form .btn-primary[type="submit"]').click()
    cy.url().should('include', '/odoo')
    cy.wait(3000)
  }

  it('Crear productos en catálogo', () => {
    login()

    productos.forEach((producto) => {
      cy.log(`Creando producto: ${producto.nombre}`)

      cy.visit('/odoo/inventory/products/new')
      cy.wait(4000)

      // Nombre del producto
      cy.get('textarea.o_field_translate', { timeout: 15000 })
        .first()
        .should('be.visible')
        .clear()
        .type(producto.nombre)

      cy.wait(500)

      // Precio de venta
      cy.get('.o_field_widget[name="list_price"] input', { timeout: 10000 })
        .clear().type(producto.precio)

      // Costo
      cy.get('.o_field_widget[name="standard_price"] input', { timeout: 10000 })
        .clear().type(producto.costo)

      // Guardar
      cy.get('.o_form_button_save').click()
      cy.wait(3000)
    })
  })
})