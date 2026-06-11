Cypress.on('uncaught:exception', () => false)

describe('MAKISHOP - Crear Empleados', () => {

  const empleados = [
    { nombre: 'Luis García', puesto: 'Ejecutivo de Ventas', departamento: 'Ventas' },
    { nombre: 'Sandra Pérez', puesto: 'Encargada de Inventario', departamento: 'Inventario' },
    { nombre: 'Mario Hernández', puesto: 'Encargado de Compras', departamento: 'Compras' },
    { nombre: 'Patricia López', puesto: 'Agente de Servicio al Cliente', departamento: 'Ventas' },
    { nombre: 'Carlos Juárez', puesto: 'Encargado de Logística', departamento: 'Inventario' },
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

  it('Crear 5 empleados', () => {
    empleados.forEach((empleado) => {
      cy.log(`Creando empleado: ${empleado.nombre}`)
      cy.visit('/odoo/employees/new')
      cy.get('.o_form_view', { timeout: 30000 }).should('be.visible')
      cy.wait(3000)

      // Nombre
      cy.get('.o_field_widget[name="name"] input')
        .clear({ force: true })
        .type(empleado.nombre, { force: true })
      cy.wait(500)
      cy.get('body').click(0, 0)
      cy.wait(500)

      // Puesto
      cy.get('.o_field_widget[name="job_title"] input')
        .clear({ force: true })
        .type(empleado.puesto, { force: true })
      cy.wait(300)

      // Guardar
      cy.get('.o_form_button_save').click()
      cy.wait(3000)
    })
  })
})