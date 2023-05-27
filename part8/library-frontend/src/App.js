import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'

import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import SetBirthYear from './components/SetBirthYear'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
  
        <Notify errorMessage={errorMessage} />
  
        <Authors authors={authorsResult.data.allAuthors} show={page === 'authors'} />
  
        <Books books={booksResult.data.allBooks} show={page === 'books'} />
  
        <LoginForm setToken={setToken} setError={notify} setPage={setPage} show={page === 'login'}/>
      </div>
    )
  }
else 
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors authors={authorsResult.data.allAuthors} show={page === 'authors'} />

      <SetBirthYear authors={authorsResult.data.allAuthors} show={page === 'authors'} />

      <Books books={booksResult.data.allBooks} show={page === 'books'} />

      <NewBook setError={notify} show={page === 'add'} />
    </div>
  )
}

export default App
