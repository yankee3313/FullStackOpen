import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLikes = async () => {
    const updatedBlog = { ...blog, likes: likes + 1 };
    const response = await blogService.update(updatedBlog.id, updatedBlog);
    setLikes(response.likes);
  }

  const remove = async (id) => {
    if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(id, user.token)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (error) {
        console.log(error)
      }
    }
  }
console.log(blog)
console.log(user)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={() => setVisible(true)}>view</button>
        <button style={showWhenVisible} onClick={() => setVisible(false)}>hide</button>
        <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes: {likes} 
        <button onClick={updateLikes}>like</button>
        </div>
        <div >user: {blog.user.name}</div>
        {user && blog.user.username === user.username && (
          <button onClick={() => remove(blog.id)}>delete</button>
          )}
        </div>
      </div>
  </div>
)
}
export default Blog