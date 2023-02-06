// https://docs.cypress.io/api/table-of-contents

describe('Student Integration Testing', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080')
        cy.contains('h1', 'Login Page')
    })
    it('Student logs in', () => {
        cy.contains('div', 'Email or username')
        cy.get('#userName').type('jeremiah')
        cy.get('#password').type('123')
        cy.get('button').click()
    })
    it('Student sees the videos and can click on one', () => {
        cy.contains('h1', 'Lesson Selection Page')
        let video = cy.get('.nav-link:last')
        video.click()
    })
    it('Webcam Permission modal displays and Student clicks decline to not use eye-tracking', () => {
        cy.contains('div', 'Webcam Permission')
        cy.contains('p', 'This lesson includes eye-tracking questions that need to use your webcam. A webcam is not required to take this lesson.')
        cy.get('.btn-green:last').click()

    })
    it('Video Player Displays and Student can click play', () => {
        cy.contains('h1', 'Basketball Video')
        cy.get(".button").click()
    })
    it('Student can view results', () => {
        cy.get('#userName').type('jeremiah')
        cy.get('#password').type('123')
        cy.get('button').click()
        cy.get(".user-button-multiline-text").click()
        cy.contains('div', 'Lesson Name')
        cy.contains('div', 'Score')
        cy.get('tr').its('length').should('be.gte', 8)
    })

    it('Student logs out', () => {
        cy.get(".button").click()
    })
})