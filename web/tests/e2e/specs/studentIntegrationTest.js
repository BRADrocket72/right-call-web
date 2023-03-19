// https://docs.cypress.io/api/table-of-contents

describe('Student Integration Testing', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080')
        cy.get('.login-div h1').contains('Sign in to your account')
    })
    it('Student logs in', () => {
        cy.get('#userName').type('jeremiah')
        cy.get('#password').type('123')
        cy.get('button').click()
    })
    it('Student sees their assigned lessons and can click on one', () => {
        cy.contains('h1', 'Lesson Selection Page')
        let lesson = cy.get('.nav-link:last')
        lesson.click()
    })
    it('Student sees the quizzes in the lesson and can click on one', () => {
        cy.get('.div-header h1').contains('Select a Quiz to Take')
        let video = cy.get('.nav-link:last')
        video.contains('Quiz')
        cy.get('.nav-link').its('length').should('be.gte', 1)
        cy.get(".button").click()
    })
    it('Student can view results', () => {
        cy.get('#userName').type('jeremiah')
        cy.get('#password').type('123')
        cy.get('button').click()
        cy.get(".user-button-multiline-text").click()
        cy.contains('div', 'Lesson Name')
        cy.contains('div', 'Score')
        cy.get('tr').its('length').should('be.gt', 0)
    })

    it('Student logs out', () => {
        cy.get(".button").click()
    })
})