import { useState } from 'react'

const Blog = ({ blog, user, addLikes, deleteBlog }) => {
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

  const handleLikeClick = () => {
    const updatedBlog = { ...blog, likes: likes + 1 }
    addLikes(updatedBlog)
    setLikes(updatedBlog.likes)
  }

  const remove = async (id) => {
    if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}?`)) {
      deleteBlog(id, blog)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button className='viewBtn' style={hideWhenVisible} onClick={() => setVisible(true)}>view</button>
      <button style={showWhenVisible} onClick={() => setVisible(false)}>hide</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div id='likes'>likes: {likes}
          <button className='likeButton' onClick={handleLikeClick}>like</button>
        </div>
        <div >user: {blog.user.name}</div>
        {user && blog.user.username === user.username && (
          <button onClick={() => remove(blog.id)}>delete</button>
        )}
      </div>
    </div>
  )
}
export default Blog