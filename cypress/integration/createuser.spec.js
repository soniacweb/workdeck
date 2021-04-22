// testing create user
describe('create user page', () => {
    it('loads the create user page', () => {
        cy.visit('http://localhost:3000/create-user')
        cy.get('form[action="/create-user"]').should('be.visible')  //creates an assertion
    })
    it.only('redirects to the create project page after hitting submit', () => {
        cy.visit('http://localhost:3000/create-user')
        cy.get('input').type('Sonia')
        cy.get('button').click()
        cy.url().should('include', '/all-projects')
    })
})
