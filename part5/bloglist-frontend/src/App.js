import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    ) 
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong username or password')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}
//
const addBlog = (blogObject) => {
  blogFormRef.current.toggleVisibility()
  blogService
    .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }).catch(error => {
      setErrorMessage('Title and Author required')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
}

const blogFormRef = useRef()

const blogForm = () => (
  <Togglable buttonLabel='new blog' ref={blogFormRef}>
    <BlogForm createBlog={addBlog} user={user}/>
  </Togglable>
)

const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser');
  window.location.reload()
}

return (
  <div>
    <h1>Blogs app</h1>
    <Notification error={errorMessage}
      success={successMessage} />

  {!user &&
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  }
  {user &&
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logout}>logout</button>
        {blogForm()}
      </div>
  }
    
  {user && <div>
  <h2>blogs</h2>
  <ul>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} user={user}/>
  )}
  </ul>
  </div>
  }
  <Footer />
  </div>
)
}

export default App