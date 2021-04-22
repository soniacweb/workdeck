describe('testing task exists', () => {
    it('task is visible', () => {
        cy.visit('http://localhost:3000/projects/1')
        cy.get('div[class="card-body"]').should('be.visible')  //task card should be present- how to check if in column 0?
    })
})


describe('delete task', ()=> {
    it('deletes a task', () => {
        cy.visit('http://localhost:3000/projects/1');
        cy.get('i[class="fas fa-trash-alt"]').should('exist').click(); // accessing delete icon and clicking
        cy.get('div[class="card-body"]').should('not.exist') // card shouldn't exist
      });
})

describe('edit task', ()=> {
    it('edits a task', () => {
        cy.visit('http://localhost:3000/projects/1');
        cy.get('i[class="fas fa-edit"]').should('exist').click();
        cy.request('POST', '/1/edit');
        cy.get('div[class="card-body"]').should('be.visible')
      });
})