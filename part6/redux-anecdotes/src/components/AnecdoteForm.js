import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notifChange } from '../reducers/notifReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(addAnecdote(content))
        dispatch(notifChange(`You added ${content}`, 10))
      }
  
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
          <div><input name="content" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  
  export default AnecdoteForm