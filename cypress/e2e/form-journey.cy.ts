describe('Form Journeys', () => {
  beforeEach(() => {
    cy.setCookie(
      'datasense-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiREFUQVNFTlNFIiwiZW1haWwiOiJkYXRhc2Vuc2VAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE3NDIzMjMxNTQsImV4cCI6MTc0NDkxNTE1NH0.wUZSWb4kOWiwmbxf0NTeLjCNzgFnA9aOw-3KEDsFwGU',
    )
    cy.window().then((win) => {
      win.localStorage.setItem('datasense@firstTime', 'false')
      win.localStorage.setItem(
        'datasense@user',
        '{"id":1,"name":"DATASENSE","email":"datasense@gmail.com","password":"$2b$10$Rc1qP.k1UMGMAmZaup/1SO6MrNrIJszhKNSfh/YoWhEfxV5eRIidi","profileImage":"http://localhost:3333/uploads/profile/1733259084140-datasense.png"}',
      )
    })
    cy.visit('http://localhost:3000/home')
  })

  it.only('should create a new form', () => {
    cy.getByData('button-new-form').should('exist').click()

    cy.getByData('input-name').should('exist').type('test form')
    cy.getByData('input-description').should('exist').type('description')

    cy.getByData('select-categories').should('exist').click()
    cy.getByData('select-1').should('exist').click()

    cy.getByData('select-form').should('exist').click()
    cy.getByData('select-null').should('exist').click()

    cy.getByData('button-create-form').should('exist').click()
  })
})
