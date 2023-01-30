// https://docs.cypress.io/api/table-of-contents

describe('Integration Test', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080')
    cy.contains('h1', 'Login Page')
  })
  it('Contains the right divs', () => {
    cy.contains('div', 'Email or username')
    cy.get('#userName').type('jeremiah')
    cy.get('#password').type('123')
    cy.get('button').click()
  })
  it('User is directed to lesson selection page', () => {
    cy.contains('h1', 'Lesson Selection Page')
    let video = cy.get('.nav-link:last')
    video.click()
  })
  it('Video Player Displays', () => {
    cy.contains('h1', 'Basketball Lesson 5')
  })
  it('Calibration Page Shows up and runs Successfully', () => {
    cy.contains('p', 'Calibration Screen')

    for (let i=0; i< 5; i++) {
      cy.get('.btn-calibrate-left').click()
      cy.get('.btn-calibrate-right').click()
      cy.get('.btn-calibrate-topLeft').click()
      cy.get('.btn-calibrate-topRight').click()
      cy.get('.btn-calibrate-center').click()
    }
    cy.get(".btn-green").click()
  })
  
})