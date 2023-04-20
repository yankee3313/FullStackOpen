import { useState } from 'react'

const BlogForm = ({ createBlog, user, blogs, setBlogs }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.name
    }

    createBlog(newBlogObject);

  setNewTitle('')
  setNewAuthor('')
  setNewUrl('')

}

    return (
      <div>
        <h2>Create a new blog</h2>
  
        <form onSubmit={addBlog}>
        <p> Title:
    <input
      value={newTitle}
      onChange={event => setNewTitle(event.target.value)}
    />
    </p>
    <p> Author:
    <input
      value={newAuthor}
      onChange={event => setNewAuthor(event.target.value)}
    />
    </p>
    <p> URL:
    <input
      value={newUrl}
      onChange={event => setNewUrl(event.target.value)}
    />
    </p>
    <button type="submit">save</button>
  </form>
      </div>
    )
  }
  export default BlogForm