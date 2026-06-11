describe('MAKISHOP - Reporte de Ventas', () => {
  beforeEach(() => {
    cy.visit('/web/login')
    cy.get('#login').clear().type('admin@makishop.local')
    cy.get('#password').clear().type('Makishop2026')
    cy.get('form .btn-primary[type="submit"]').click()
    cy.url().should('include', '/odoo')
  })

  it('Acceder a la lista de cotizaciones', () => {
    cy.visit('/odoo/sales')

    cy.get('body').then(($body) => {
      if ($body.find('.o_dialog_container .btn-close').length) {
        cy.get('.o_dialog_container .btn-close').click()
      }
    })

    cy.get('.o_list_view').should('be.visible')
    cy.get('.o_data_row').should('have.length.greaterThan', 0)
  })

  it('Ver reporte de ventas por vendedor', () => {
    // Navegar directo al reporte de ventas
    cy.visit('/odoo/action-580')

    // Verificar que cargó el reporte
    cy.get('.o_control_panel').should('be.visible')
    cy.get('.o_graph_renderer, .o_pivot_renderer, .o_list_view')
      .should('exist')
  })
})