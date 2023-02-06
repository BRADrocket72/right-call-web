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
    it('Video Player Displays', () => {
        cy.contains('h1', 'Basketball Video')
    })
    it('Student can complete the Calibration Page Successfully and can click play video', () => {
        cy.contains('p', 'Calibration Screen')

        for (let i=0; i< 5; i++) {
            cy.get('.btn-calibrate-left').click()
            cy.get('.btn-calibrate-right').click()
            cy.get('.btn-calibrate-topLeft').click()
            cy.get('.btn-calibrate-topRight').click()
            cy.get('.btn-calibrate-center').click()
        }
        cy.get(".btn-green").click()
        cy.contains('div', 'Play')
        cy.get('#playOrPause').click()
        cy.get('#playOrPause').click()
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