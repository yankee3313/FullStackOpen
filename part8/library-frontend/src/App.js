import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    author
    genres
    published
    id
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors authors={authorsResult.data.allAuthors} show={page === 'authors'} />

      <Books books={booksResult.data.allBooks} show={page === 'books'} />

      <NewBook ALL_AUTHORS={ALL_AUTHORS} ALL_BOOKS={ALL_BOOKS} show={page === 'add'} />
    </div>
  )
}

export default App
