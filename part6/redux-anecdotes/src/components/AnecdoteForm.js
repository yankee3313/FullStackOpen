import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notifChange, resetNotif } from '../reducers/notifReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const handleAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(addAnecdote(content))
        dispatch(notifChange(`You added "${content}"`))
        setTimeout(() => {
          dispatch(notifChange(''))
        }, 5000)
      }
  
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleAddAnecdote}>
          <div><input name="content" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  
  export default AnecdoteForm