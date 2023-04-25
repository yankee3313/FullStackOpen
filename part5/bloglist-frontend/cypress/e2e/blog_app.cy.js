describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ross Comer',
      username: 'rcomer',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('log in')
    cy.contains('Blog app, Ross Comer 2023')
  })
  it('login form can be opened', function() {
    cy.contains('log in').click()
  })
  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('rcomer')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
    cy.contains('Ross Comer logged in')
  })
  it('user not in database cannot login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('jimmy')
    cy.get('#password').type('rustler')
    cy.get('#login-button').click()
    cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'rcomer', password: 'password' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('www.cypressurl.com')
      cy.contains('save').click()
      cy.get('.success')
        .should('contain', 'a blog created by cypress')
      cy.get('.blog').should('contain', 'www.cypressurl.com')
        .and('contain', 'a blog created by cypress')
        .and('contain', 'Cypress Author')
        .and('contain', 'www.cypressurl.com')
    })

    it('a user can like a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('www.cypressurl.com')
      cy.contains('save').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('#likes')
        .should('contain', 'likes: 1')
    })

    it('a user can delete a blog they created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('www.cypressurl.com')
      cy.contains('save').click()
      cy.contains('view').click()
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true)
        cy.contains('delete').click().then(() => {
          expect(win.confirm).to.be.calledOnce
        })
      })
      cy.contains('www.cypressurl.com').should('not.exist')
    })
    it('a user cant see delete button on post they didnt create', function() {
      const newUser = {
        name: 'Superuser',
        username: 'root',
        password: 'password2'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', newUser)
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('www.cypressurl.com')
      cy.contains('save').click()
      cy.contains('logout').click()

      cy.login({ username: 'root', password: 'password2' })

      cy.contains('view').click()
      cy.contains('delete').should('not.exist')
    })
    it('blogs are ordered according to likes', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('www.cypressurl.com')
      cy.contains('save').click()
      cy.contains('view').click()
      cy.get('.blog').eq(0).parent().find('.likeButton', { timeout: 10000 }).should('be.visible').click()

      cy.contains('new blog').click()
      cy.get('#title').type('second blog')
      cy.get('#author').type('Second Author')
      cy.get('#url').type('www.secondBlog.com')
      cy.contains('save').click()
      cy.get('.viewBtn').last().should('be.visible').click()
      cy.get('.likeButton').last().should('be.visible').click()
      cy.get('.likeButton').last().should('be.visible').click()

      cy.reload()

      cy.get('.blog').eq(0).should('contain', 'second blog')
      cy.get('.blog').eq(1).should('contain', 'a blog created by cypress')
    })
  })
})