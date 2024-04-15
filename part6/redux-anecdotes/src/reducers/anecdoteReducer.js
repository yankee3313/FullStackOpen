import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteSuccess(state, action) {
      const updatedAnecdote = action.payload
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { voteSuccess, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

//action creators

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToVote = anecdotes.find((anecdote) => anecdote.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }
    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote)
      dispatch(voteSuccess(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer