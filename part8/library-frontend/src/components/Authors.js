import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(UPDATE_AUTHOR, { refetchQueries: [{ query: props.ALL_AUTHORS }] })

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({  variables: { name, setBornTo: parseInt(born) } })

    setBorn('')
    setName('')

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
        </form>
        </div>
    </div>
  )
}

export default Authors
