import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS, ADD_AUTHOR } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const authorsResult = useQuery(ALL_AUTHORS)
  const [ addAuthor ] = useMutation(ADD_AUTHOR, { 
    onError: (error) => {
      console.log(error)
      props.setError('ERROR ADDING AUTHOR')
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {

        return {
          allAuthors: allAuthors.concat(response.data.addAuthor)
        }
      })
    }})
  const [ createBook ] = useMutation(CREATE_BOOK, { 
    onError: (error) => {
      props.setError('ERROR CREATING BOOK ENTRY')
    },
    update: (cache, response) => {    
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    }})

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const authors = authorsResult.data.allAuthors
    const existingAuthor = authors.find(a => a.name === author)

    if(!existingAuthor){
    await addAuthor({ variables: {name: author}})
  }

    await createBook({  variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook