import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  const blogWithUser = { ...response.data, user: JSON.parse(window.localStorage.getItem('loggedBlogappUser')) }
  console.log(blogWithUser)
  return blogWithUser
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = (id, token) => {
  console.log('deleteBlog token:', token)
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const getOne = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, update, setToken, deleteBlog, getOne }