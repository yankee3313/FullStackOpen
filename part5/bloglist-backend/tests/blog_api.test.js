const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('verifies the id property is defined', async () => {
    const response = await api .get('/api/blogs')
    for (let i=0; i<response.length; i++){
      console.log(response.body[i].id)
      expect(response.body[i].id).toBeDefined()
    }
  })}, 10000)

describe('addition of a new blog', () => {
  test('verifies POST method creates new post', async () => {
    const testBlog = 
      {
        title: 'HTML is easy',
        author: 'Jerry Springer',
        url: 'www.nice.com',
        likes: 24
      }
    await api .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    const authors = response.body.map(r => r.author)
    const urls = response.body.map(r => r.url)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('HTML is easy')
    expect(authors).toContain('Jerry Springer')
    expect(urls).toContain('www.nice.com')
  })

  test('if likes property is missing, default to 0', async () => {
    const testBlog = 
      {
        title: 'HTML is easy',
        author: 'Jerry Springer',
        url: 'www.nice.com',
      }
    await api .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    expect(response.body[response.body.length - 1].likes).toEqual(0)
  })

  test('if title or url properties are missing, return 400 code', async () => {
    const testBlogNoTitle = 
      {
        author: 'Jerry Springer',
        url: 'www.nice.com',
        likes: 25
      }
    
    const response = await api
      .post('/api/blogs')
      .send(testBlogNoTitle)
    expect(response.statusCode).toBe(400)
    
  }, 10000)
})

describe('deletion of a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const urls = blogsAtEnd.map(r => r.url)

    expect(urls).not.toContain(blogToDelete.url)
  })
})

describe('updating the likes of a blog', () => {
  test('succeeds with status code 200 if likes are updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newLikes = blogsAtStart[0].likes + 1

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: newLikes })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('likes', newLikes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
  
    await user.save()
  })
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body.error).toContain('expected `username` to be unique')
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 10000)
})

afterAll(async () => {
  await mongoose.connection.close()
})
