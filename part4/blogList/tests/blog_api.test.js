const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('verifies the id property is defined', async () => {
    const response = await api .get('/api/blogs')
    for (let i=0; i<response.length; i++){
      console.log(response.body[i].id)
      expect(response.body[i].id).toBeDefined()
    }
  })})

describe('addition of a new note', () => {
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

  describe('deletion of a blog', () => {
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

  afterAll(async () => {
    await mongoose.connection.close()
  })
})