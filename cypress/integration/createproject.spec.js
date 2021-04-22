http://localhost:3000/projects/1

describe('testing project board', () => {
    it('loads the create user page', () => {
        cy.visit('http://localhost:3000/projects/1')
        cy.get('a[href="/projects/{{projectID}}/create-task"]').should('be.visible')  //creates an assertion
    })
    it.only('redirects to the create task page', () => {
        cy.visit('http://localhost:3000/projects/1/create-task')
        cy.get('input').type('New Task')
        cy.get('textarea').type('Created a new task for cypress test')
        cy.get('option[value="{{this.id}}]').contains('Sonia').click() //breaking
        cy.get('button').click()
        cy.url().should('include', '/projects/${projectID}')
    })
})
