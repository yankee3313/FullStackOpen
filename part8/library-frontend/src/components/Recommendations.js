import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const favoriteBooks = useQuery(ALL_BOOKS, {
    variables: { genre: props.favoriteGenre }
  })

  let books = favoriteBooks?.data?.allBooks

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>books in your favorite genre <b>{props.favoriteGenre}</b></div>
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
    </div>
  )
}

export default Recommendations
