import { faker } from '@faker-js/faker'

// Configurar faker en español / Guatemala
faker.locale = 'es'

// Generar datos falsos realistas de MAKISHOP
const clienteAleatorio = {
  nombre: faker.person.fullName(),
  empresa: faker.company.name() + ' Guatemala',
  email: faker.internet.email(),
  telefono: '+502 ' + faker.string.numeric(4) + '-' + faker.string.numeric(4),
  ciudad: faker.helpers.arrayElement([
    'Ciudad de Guatemala',
    'Cobán',
    'Quetzaltenango',
    'Escuintla',
    'Antigua Guatemala'
  ])
}

const productoAleatorio = faker.helpers.arrayElement([
  'Laptop',
  'Mouse',
  'Teclado',
  'Monitor',
  'Audífonos'
])

describe('MAKISHOP - Pruebas con datos generados por IA', () => {
  beforeEach(() => {
    cy.visit('/web/login')
    cy.get('#login').clear().type('admin@makishop.local')
    cy.get('#password').clear().type('Makishop2026')
    cy.get('form .btn-primary[type="submit"]').click()
    cy.url().should('include', '/odoo')
  })

  it(`Crear cliente generado: ${clienteAleatorio.empresa}`, () => {
    cy.log('Cliente generado por IA:', JSON.stringify(clienteAleatorio))

    cy.visit('/odoo/contacts/new')
    cy.get('.o_form_view').should('be.visible')

    // Seleccionar tipo Empresa
    cy.get('input[data-value="company"]').click({ force: true })

    // Nombre de la empresa
    cy.get('.o_field_widget[name="name"] input')
      .clear().type(clienteAleatorio.empresa)

    // Email
    cy.get('.o_field_widget[name="email"] input')
      .clear().type(clienteAleatorio.email)

    // Teléfono
    cy.get('.o_field_widget[name="phone"] input')
      .clear().type(clienteAleatorio.telefono)

    // Guardar
    cy.get('.o_form_button_save').click()

    // Verificar
    cy.contains(clienteAleatorio.empresa).should('be.visible')
  })

  it(`Crear cotización con producto: ${productoAleatorio}`, () => {
    cy.log('Producto generado por IA:', productoAleatorio)

    cy.visit('/odoo/sales/new')
    cy.get('.o_form_view').should('be.visible')

    // Seleccionar cliente existente
    cy.get('.o_field_widget[name="partner_id"] input')
      .type('TechZone')
    cy.get('.o_field_many2one_selection .dropdown-item')
      .first().click()

    cy.wait(2000)

    // Agregar producto aleatorio
    cy.contains('Agregar un producto').click()
    cy.wait(1500)

    cy.get('div[name="product_template_id"] input.o_input')
      .should('exist')
      .click({ force: true })
      .type(productoAleatorio)

    cy.get('.o_field_many2one_selection .dropdown-item', { timeout: 10000 })
      .first().click()

    // Guardar
    cy.get('.o_form_button_save').click()
    cy.get('.o_statusbar_status').should('be.visible')
  })
})