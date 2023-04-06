const Blog = require('../models/blog')

const initialBlogs = 
  [{
    title: 'test1',
    author: 'author1',
    url: 'www.one.com',
    likes: 1
  },
  {
    title: 'test2',
    author: 'author2',
    url: 'www.two.com',
    likes: 2
  }]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}