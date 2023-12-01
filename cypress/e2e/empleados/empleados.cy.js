//import { importData } from '../../fixtures/importData.csv'

/**
 * Característica: Creación Manual de Empleados
 * 
 * Escenario: Crear un nuevo empleado
 * Escenario: Validar campos obligatorios
 * Escenario: Validar formato de datos
 * Escenario: Crear empleado con información opcional
 * Escenario: Registró en el historial de creación de empleados 
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

    /** Escenario: Registró en el historial de creación de empleados 

        Dado que estoy en la página de administración de empleados
        Cuando creo un nuevo empleado
        Entonces debería ver un registro en el historial de creación de empleados
    */
    it('Registró en el historial de creación de empleados', () => {
        cy.get('button').contains('Add').click()
        cy.get('input[placeholder="First Name"]').type('Maria')
        cy.get('input[placeholder="Last Name"]').type('Gonzalez')
        cy.get('button').contains('Save').click().wait(3000)

        cy.get('a').contains('Employee List').click()
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input').type('Maria Gonzalez')
        cy.get('button').contains('Search').click()
        cy.get('div').contains('Maria').should('be.visible')
        cy.get('div').contains('Gonzalez').should('be.visible')
    })

})



// /**
//  * Característica: Creación Masiva de Empleados
//  * 
//  * Escenario: Importación de datos en masa
//  * Escenario: Validación de datos durante la importación
//  * Escenario: Mapeo de campos
//  * Escenario: Manejo de errores durante la importación
//  * Escenario: Límite de importación
//  * Escenario: Notificación de importación exitosa
//  * Escenario: Registró en el historial
//  * Escenario: Pruebas de escalabilidad
//  */
// describe('Creación Masiva de Empleados', () => {
//     beforeEach(() => {
//         cy.iniciarSesion('Admin', 'admin123')
//         cy.get('a').contains('PIM').click()
//         cy.get('.oxd-table-filter-header-title > .oxd-text').should('contain', 'Employee Information')
//         cy.get('span').contains('Configuration').click()
//         cy.get('a').contains('Data Import').click()
//     })

//     it('Importación de datos en masa', () => {
//         cy.get('div').contains('Browse').attachFile(importData)
//         cy.get('button').contains('Upload').click().wait(3000)
//         cy.get('p').contains('Successfully Imported').should('be.visible')
//     })

//     /**
//      * 
//     Escenario: Importación de datos en masa
//         Dado que existe una opción para importar datos en masa
//         Cuando se selecciona un archivo CSV con la información requerida para crear empleados
//         Entonces el sistema debería procesar la importación

//     Escenario: Validación de datos durante la importación
//         Dado que se está realizando la importación de datos
//         Cuando el sistema procesa la importación
//         Entonces se deben realizar validaciones para garantizar la corrección de los datos y su cumplimiento con los requisitos

//     Escenario: Mapeo de campos
//         Dado que se está importando un archivo de datos
//         Cuando se realiza el mapeo de campos
//         Entonces se debe asegurar que los campos del archivo de importación se asignen correctamente a los campos correspondientes en OrangeHRM

//     Escenario: Manejo de errores durante la importación
//         Dado que se está realizando una importación
//         Cuando surgen errores durante el proceso de importación
//         Entonces el sistema debe registrar detalles específicos sobre los errores y generar informes para su revisión

//     Escenario: Límite de importación
//         Dado que se está realizando una importación masiva
//         Cuando se supera el límite de cantidad de empleados a crear en una sola importación
//         Entonces el sistema debe detener la operación y notificar sobre el límite alcanzado para evitar problemas de rendimiento

//     Escenario: Notificación de importación exitosa
//         Dado que se completa una importación sin errores
//         Entonces el sistema debe proporcionar una confirmación clara de la importación exitosa y notificar a los interesados si es necesario

//     Escenario: Registró en el historial
//         Dado que se completa una importación masiva de empleados
//         Cuando finaliza el proceso de importación
//         Entonces se debe registrar esta acción en un historial o registro de auditoría

//     Escenario: Pruebas de escalabilidad
//         Dado que se realizan pruebas de importación masiva
//         Cuando se utilizan grandes conjuntos de datos para la importación
//         Entonces se deben realizar pruebas para garantizar que la importación funcione eficientemente incluso con grandes cantidades de datos

//      */
// })
