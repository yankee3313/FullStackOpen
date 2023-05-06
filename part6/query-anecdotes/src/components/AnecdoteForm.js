const AnecdoteForm = ({ newAnecdoteMutation, notifDispatch }) => {

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      notifDispatch({ type: 'LENGTHERROR' })
      setTimeout(() => {
        notifDispatch({ type: 'CLEAR' })
      }, 5000)
    }
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
