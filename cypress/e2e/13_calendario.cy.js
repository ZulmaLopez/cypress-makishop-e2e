Cypress.on('uncaught:exception', () => false)

describe('MAKISHOP - Crear Eventos de Calendario', () => {

  const eventos = [
    { nombre: 'Reunión con Carlos Mendoza', fecha_inicio: '06/10/2026 09:00:00', fecha_fin: '06/10/2026 10:00:00' },
    { nombre: 'Presentación productos nuevos', fecha_inicio: '06/11/2026 10:00:00', fecha_fin: '06/11/2026 11:00:00' },
    { nombre: 'Revisión de inventario mensual', fecha_inicio: '06/12/2026 08:00:00', fecha_fin: '06/12/2026 09:00:00' },
    { nombre: 'Capacitación equipo de ventas', fecha_inicio: '06/13/2026 14:00:00', fecha_fin: '06/13/2026 16:00:00' },
    { nombre: 'Cierre de mes MAKISHOP', fecha_inicio: '06/30/2026 09:00:00', fecha_fin: '06/30/2026 12:00:00' },
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

  it('Crear 5 eventos en calendario', () => {
    eventos.forEach((evento) => {
      cy.log(`Creando evento: ${evento.nombre}`)
      cy.visit('/odoo/calendar/calendar.event/new')
      cy.get('.o_form_view, .o_FormRenderer', { timeout: 60000 }).should('exist')
      cy.wait(4000)

      // Nombre del evento
      cy.get('.o_field_widget[name="name"] input', { timeout: 15000 })
        .clear({ force: true })
        .type(evento.nombre, { force: true })
      cy.wait(500)
      cy.get('body').click(0, 0)
      cy.wait(500)

      // Fecha inicio
      cy.get('input#start_0', { timeout: 10000 })
        .clear({ force: true })
        .type(evento.fecha_inicio, { force: true })
      cy.wait(300)
      cy.get('body').click(0, 0)
      cy.wait(500)

      // Fecha fin
      cy.get('input#start_0', { timeout: 10000 })
        .clear({ force: true })
        .type(evento.fecha_fin, { force: true })
      cy.wait(300)
      cy.get('body').click(0, 0)
      cy.wait(300)

      // Guardar
      cy.get('.o_form_button_save').click()
      cy.wait(3000)
    })
  })
})