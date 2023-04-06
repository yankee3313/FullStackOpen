const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).json({
      error: 'Title and url are required'
    })} else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)}
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id,
    request.body,{ new: true })

  if(!blog) {
    return response.status(404).json({ message: 'Blog not found' })
  }

  return response.status(200).json(blog)
})

module.exports = blogsRouter