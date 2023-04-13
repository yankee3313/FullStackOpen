import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
  createBlog({
    title: newTitle,
    author: newAuthor,
    url: newUrl,
  })

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