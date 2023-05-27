import { useState } from 'react'

const Books = (props) => {
  const [filterGenre, setfilterGenre] = useState('all genres')

  if (!props.show) {
    return null
  }

  const books = props.books

  let filteredBooks = books

  const genres = books.reduce((acc, book) => {
    book.genres.forEach(genre => {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    })
    return acc
  }, [])

  if(filterGenre === 'all genres'){
    filteredBooks = books
  } else {
    filteredBooks = books.filter(b => b.genres.includes(filterGenre))
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
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            
          ))}
        </tbody>
      </table>
      <div>{genres.map(genre => (
          <button onClick={()=> setfilterGenre(genre) }key={genre}>{genre}</button>
        ))}
        <button onClick={()=> setfilterGenre('all genres') }key={'all genres'}>all genres</button>
      </div>
    </div>
  )
}

export default Books
