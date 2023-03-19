describe('Instructor Integration Testing', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080')
        cy.get('.login-div h1').contains('Sign in to your account')
    })  
    it('Instructor logs in', () => {
        cy.get('#userName').type('testinstructor123')
        cy.get('#password').type('testinstructor123')
        cy.get('button').click()
    })
    it('Instructor is directed to instructor page', () => {
        cy.get('.createClassLink').contains('Create a Classroom')
        cy.get('.updateClassLink').contains('Update Class')
        cy.get('.customLessonLink').contains('Create Custom Lesson Packs')
        cy.get('.updateLessonLink').contains('Update Your Lessons')
        cy.get('.customLessonLink').click()
    })
       it('Instructor sees the admin lessons and can create their own custom version of a lesson', () => {
        cy.contains('h1', 'Select Admin Lesson to Customize')
        cy.get('.buttonLink').its('length').should('be.gte', 1)
        cy.get('.buttonLink:last').click()
        cy.contains('.modal', 'Create Custom Lesson Confirmation')
        cy.contains('p', 'Do you want to create your own version of this lesson?')
        cy.get('.btn-green:last').click()
        cy.get(".button").click()
    })
    it('Instructor can access and use assignTimestamps page', () => {
        cy.get('#userName').type('testinstructor123')
        cy.get('#password').type('testinstructor123')
        cy.get('button').click()
        cy.get('.updateLessonLink').click()
        cy.contains('h1', 'Select Lesson to Update')
        cy.get('.buttonLink:last').click()
        cy.get('.nav-link').its('length').should('be.gte', 1)
        cy.get('.lesson-img:last').click()
        cy.contains('div', 'Add Timestamp Here')
        cy.get('#add-timestamp-button').click()
        cy.get('#assign-activity-button:first').click()
        cy.contains('header', 'Assign New Activity')
        cy.get('.btn-green').click()
        cy.get('#question-text').type('What is the call?')
        cy.get('#answer-one').type('Traveling')
        cy.get('#answer-two').type('Double Dribble')
        cy.get('.btn-green:first').click()
        cy.get('#feedback-button').click()
        cy.get('.btn-green:last').click()
        cy.contains('div', '00:00')
        cy.get('#delete-timestamp-button:first').click()
        cy.get(".button").click()
    })
    it('Instructor can add students to class and create a class', () => {
        cy.get('#userName').type('testinstructor123')
        cy.get('#password').type('testinstructor123')
        cy.get('button').click()
        cy.get('.createClassLink').click()
        cy.contains('h3', 'Classroom Creation')
        cy.get('#className').type('TestClass123')
        cy.get('.nav-link:last').click()
        cy.contains('div', 'Students Selected')
        cy.get('.studentName').its('length').should('eq', 1)
        cy.get(".button").click()
    })  
    it('Instructor can see their created classes', () => {
        cy.get('#userName').type('testinstructor123')
        cy.get('#password').type('testinstructor123')
        cy.get('button').click()
        cy.get('.updateClassLink').click()
        cy.contains('h1', 'Update Your Classes')
        cy.contains('div', 'TestClass123')
    })  
    it('Instructor can add/remove their custom lessons to their class', () => {
        cy.get('.updateButton:last').contains('Add/Remove Lessons')
        cy.contains('p', '1 Video Lessons')
    })  
    it('Instructor can add/remove students to their class', () => {
        cy.get('.updateButton:first').click()
        cy.get('.removeStudent').its('length').should('eq', 2)
        cy.get('.removeStudent:first').click()
        cy.contains('p', '1 Students')
        cy.get('.updateButton:first').click()
        cy.get('.addStudent').its('length').should('be.eq', 1)
        cy.get('.addStudent:first').click()
        cy.contains('p', '2 Students')
        cy.get('.button').click()
    })  
})