describe('Admin Integration Testing', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080')
        cy.get('.login-div h1').contains('Sign in to your account')
    })
    it('Admin logs in', () => {
        cy.get('#userName').type('jeremiahadmin')
        cy.get('#password').type('jeremiahadmin')
        cy.get('button').click()
    })
    it('Admin is directed to Admin Page and displays correct buttons', () => {
        cy.get('.buttonLink:first').contains('Create Lesson')
        cy.get('.buttonDeleteLink').contains('Delete Lesson')
        cy.get('.buttonLink:last').contains('Update Lessons')
        cy.get('.upload-description-p:first').click()
    })
    it('Admin has the option to upload a lesson with multiple videos', () => {
        cy.contains('label', 'Name of Lesson:')
        cy.contains('label', "Description of Lesson")
        cy.contains('label', 'Upload Video Files To Lesson:')
        cy.get('.button').click()
    })
    it('Admin has the option to select a lesson or a video in the lesson to delete', () => {
        cy.get('#userName').type('jeremiahadmin')
        cy.get('#password').type('jeremiahadmin')
        cy.get('button').click()
        cy.get('.delete-description-p').click()
        cy.contains('h4', "Select Lesson to Delete:")
        cy.contains('a', 'Delete the Entire Lesson')
        cy.contains('a', 'Delete Video in Lesson')
        cy.get('a:last').click()
    })
    it('Admin chooses video in lesson to delete and gets a confirmation warning', () => {
        cy.contains('h4', "Select Video to Delete:")
        cy.get('.nav-link:last').click()
        cy.contains('p', 'Are you sure you wish to delete this video?')
        cy.get('.btn-green:last').click()
        cy.get('.button').click()
    })
    it('Admin clicks on `Update Lessons` link and sees the available lessons', () => {
        cy.get('#userName').type('jeremiahadmin')
        cy.get('#password').type('jeremiahadmin')
        cy.get('button').click()
        cy.get('.assign-description-p').click()
        cy.contains('h1', 'Select Lesson to Edit')
        cy.get('.buttonLink:last').click()
        cy.get('.nav-link').its('length').should('be.gte', 1)
    })
    it('Admin sees the quizzes and can update the lesson name', () => {
        cy.get('#isOnInitialAssignTimestampsPage').contains('Select Quiz to Add Questions to:')
        cy.get('#lessonNameText').contains('Edit Lesson Name:')
        cy.get('#lessonNameInput').type(' 2')
        cy.get('#customize-lesson-button').click()
        cy.get('#lessonSavedWarning').contains('Lesson Name Updated')
    })
    it('Admin can add questions and feedback to the quiz at any timestamp', () => {
        cy.get('.lesson-img:last').click()
        cy.contains('div', 'Timestamp')
        cy.get('#add-timestamp-button').click()
        cy.get('#assign-activity-button:first').click()
        cy.contains('header', 'Assign New Activity')
        cy.get('.btn-green').click()
        cy.get('#question-text').type('What is the call?')
        cy.get('#answer-one').type('Traveling')
        cy.get('#answer-two').type('Double Dribble')
        cy.get('.btn-green:first').click()
    })
    it('Admin seees the newly added activity and can choose to save or remove it', () => {
        cy.contains('div', '00:00')
        cy.get('#delete-timestamp-button:first').click()
    })  
    it('Admin logs out', () => {
        cy.get(".button").click()
    })  
})