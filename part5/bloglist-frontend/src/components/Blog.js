import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes);

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={() => setVisible(true)}>view</button>
        <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes: {likes} 
        <button onClick={updateLikes}>like</button>
        </div>
        <div >user: {blog.user.name}</div>
        <button onClick={() => setVisible(false)}>hide</button>
        </div>
      </div>
  </div>
)
}
export default Blog