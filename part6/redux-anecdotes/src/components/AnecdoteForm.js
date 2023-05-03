import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notifChange } from '../reducers/notifReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
          dispatch(addAnecdote(newAnecdote))
          dispatch(notifChange(`You added "${content}"`))
          setTimeout(() => {
            dispatch(notifChange(''))
          }, 5000)
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