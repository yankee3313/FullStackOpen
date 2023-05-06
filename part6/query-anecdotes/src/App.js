import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useReducer } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `You voted for '${action.content}'`
    case 'LENGTHERROR': 
      return 'too short anecdote, must have length 5 or more'
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const App = () => {
  const queryClient = useQueryClient()

  const [notifState, notifDispatch] = useReducer(notifReducer, null)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    notifDispatch({ type: 'VOTE', content: anecdote.content })
    setTimeout(() => {
      notifDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notifState={notifState}/>
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation}
        notifDispatch={notifDispatch} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
