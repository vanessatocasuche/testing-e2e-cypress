
/**
 * Característica: Creación Manual de Empleados
 * 
 * Escenario: Crear un nuevo empleado
 * Escenario: Validar campos obligatorios
 * Escenario: Validar formato de datos
 * Escenario: Crear empleado con información opcional
 * 
 * */
describe('Creación Manual de Empleados', () => {

    
    beforeEach(() => {
        cy.iniciarSesion('Admin', 'admin123')
        cy.get('a').contains('PIM').click()
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('contain', 'Employee Information')
    })

    /** Escenario: Crear un nuevo empleado
     * 
        Dado que estoy en la página de administración de empleados
        Cuando ingreso la información del nuevo empleado:
        | Nombre     | Apellido   | Puesto         | Departamento   |
        | Juan       | Pérez      | Desarrollador  | TI             |
        Y hago clic en el botón "Crear empleado"
        Entonces debería ver un mensaje de confirmación
        Y el nuevo empleado debería aparecer en la lista de empleados
    */
    it('Crear un nuevo empleado', () => {
        cy.get('button').contains('Add').click()
        cy.get('input[placeholder="First Name"]').type('Juan')
        cy.get('input[placeholder="Last Name"]').type('Perez')
        cy.get('button').contains('Save').click()
        cy.get('div').contains('Successfully Saved').should('be.visible')
    })

    /** Escenario: Validar campos obligatorios

        Dado que estoy en la página de administración de empleados
        Cuando intento crear un nuevo empleado sin proporcionar información obligatoria
        Entonces debería ver un mensaje de error indicando los campos faltantes
    */
    it('Validar campos obligatorios', () => {
        cy.get('button').contains('Add').click()
        cy.get('button').contains('Save').click()
        cy.get('div').contains('Required').should('be.visible')
    })

    /*  Escenario: Validar formato de datos

        Dado que estoy en la página de administración de empleados
        Cuando ingreso información con formato incorrecto para un nuevo empleado
        Entonces debería ver un mensaje de error indicando el formato incorrecto
    */
    it('Validar formato de datos', () => {
        cy.get('button').contains('Add').click()
        cy.get('input[placeholder="First Name"]').type('Juan')
        cy.get('input[placeholder="Last Name"]').type('Perez')
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').type('abc')
        cy.get('button').contains('Save').click()
        cy.get('div').contains('Should be a number').should('be.visible')
    })

    /** Escenario: Crear empleado con información opcional

        Dado que estoy en la página de administración de empleados
        Cuando ingreso la información básica y opcional del nuevo empleado:
        | Nombre     | Apellido   | Puesto         | Departamento   | Fecha de Inicio |
        | María      | González   | Diseñador UX   | Diseño         | 2023-01-15      |
        Y hago clic en el botón "Crear empleado"
        Entonces debería ver un mensaje de confirmación
        Y el nuevo empleado debería aparecer en la lista de empleados
    */
    it('Crear empleado con información opcional', () => {
        cy.get('button').contains('Add').click()
        cy.get('input[placeholder="First Name"]').type('Maria')
        cy.get('input[placeholder="Last Name"]').type('Gonzalez')
        cy.get('button').contains('Save').click().wait(3000)

        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').type('1999-01-15')
        cy.get('button').contains('Save').click().wait(3000)

        cy.get('div').contains('Successfully updated').should('be.visible')
    })

})

