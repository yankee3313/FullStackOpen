import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const filterBooks = useQuery(ALL_BOOKS)
  const allBooks = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  const books = filterBooks.data.allBooks
  const booklist = allBooks.data.allBooks

  const genres = booklist.reduce((acc, book) => {
    book.genres.forEach(genre => {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    })
    return acc
  }, []) 
  
  const submit = async (genre) => {
    filterBooks.refetch({ genre })
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            
          ))}
        </tbody>
      </table>
      <div>{genres.map(genre => (
          <button onClick={()=> submit(genre) }key={genre}>{genre}</button>
        ))}
        <button onClick={()=> submit(null) }key={'all genres'}>all genres</button>
      </div>
    </div>
  )
}

export default Books
