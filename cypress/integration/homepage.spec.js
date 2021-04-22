describe('/', () => {
    it('the home page loads user form', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('User')
        cy.get('card-title')
          .find('li')
          .should($li => {
              expect($li).to.have.length(2)
          })
    })
})