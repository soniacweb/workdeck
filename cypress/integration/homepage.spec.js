// testing create user
describe('/', () => {
    it('loads the create user page if no users exist', () => {
        cy.visit('http://localhost:3000/')
        cy.get('form[action="/create-user"]').should('be.visible')  //creates an assertion
    })
    it('loads the create user button', () => {

    })
})

