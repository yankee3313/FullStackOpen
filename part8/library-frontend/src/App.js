import { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import SetBirthYear from './components/SetBirthYear'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS, ALL_USERS, BOOK_ADDED } from './queries'

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

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState('')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const usersResult = useQuery(ALL_USERS)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

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
  
        <Books show={page === 'books'} />
  
        <LoginForm setToken={setToken} setError={notify} setPage={setPage} setUser={setUser} show={page === 'login'}/>
      </div>
    )
  }
else {
  let favoriteGenre = usersResult.data.allUsers.find(u => u.username === user).favoriteGenre

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors authors={authorsResult.data.allAuthors} show={page === 'authors'} />

      <SetBirthYear authors={authorsResult.data.allAuthors} show={page === 'authors'} />

      <Books booksResult={booksResult.data.allBooks} show={page === 'books'} />

      <Recommendations favoriteGenre={favoriteGenre} show={page === 'recommendations'} />

      <NewBook setError={notify} show={page === 'add'} />
    </div>
  )
}
}

export default App
