import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'
import { useDispatch, useSelector } from 'react-redux'
import { notifChange } from './reducers/notifReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    const user = storageService.loadUser()
    console.log('Loaded user:', user)
    if (user) {
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const notifyWith = (message, type) => {
    dispatch(notifChange(message, type, 10))
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      storageService.saveUser(user)
      blogService.setToken(user.token)
      dispatch(setUser(user))
      notifyWith('welcome!')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const logout = () => {
    storageService.removeUser()
    dispatch(clearUser())
    blogService.setToken(null)
    notifyWith('logged out')
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      notifyWith(e.response.data.error, 'error')
    }
  }

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
      notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    } catch (e) {
      notifyWith('error liking blog', 'error')
    }
  }

  const handleRemove = async (blog) => {
    const ok = window.confirm(
      `Are you sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      try {
        await dispatch(removeBlog(blog.id))
        notifyWith(`The blog '${blog.title}' by '${blog.author}' removed`)
      } catch (e) {
        notifyWith('failed to remove blog', 'error')
      }
    }}

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog createBlog={handleCreateBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map((blog) => (
          console.log('User:', user),
          console.log('Blog username:', blog.user.username),
          <Blog
            key={blog.id}
            blog={blog}
            like={() => handleLike(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => handleRemove(blog)}
          />
        ))}
      </div>
      <Footer/>
    </div>
  )
}

export default App
