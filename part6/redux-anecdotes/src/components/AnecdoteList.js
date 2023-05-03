import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import React from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const filter = state.filter
    const anecdotes = state.anecdotes.slice().sort((a, b) => b.votes - a.votes)
    
    if (filter === '') {
      return anecdotes
    }

    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  })  

  const handleVote = (id) => {
    dispatch(vote(id))
  }

return (
  <div>
     {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
)
}

export default AnecdoteList