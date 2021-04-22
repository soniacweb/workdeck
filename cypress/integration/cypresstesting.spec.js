// testing landing page
describe('/', () => {
    it('loads the create user page if no users exist', () => {
        cy.visit('http://localhost:3000/')
        cy.get('form[action="/create-user"]').should('be.visible')  //creates an assertion
    })
    it('loads the create user button', () => {

    })
})

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

// create project 

describe('testing project board', () => {
    it('loads the create user page', () => {
        cy.visit('http://localhost:3000/projects/1')
        cy.get('a[href="/projects/{{projectID}}/create-task"]').should('be.visible')  //creates an assertion
    })
    it.only('redirects to the create task page', () => {
        cy.visit('http://localhost:3000/projects/1/create-task')
        cy.get('input').type('New Task')
        cy.get('textarea').type('Created a new task for cypress test')
        cy.get('select').select('1').click() //dropdown breaking
        cy.get('button').click()
        cy.url().should('include', '/projects/1')
    })
})



// testing tasks
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