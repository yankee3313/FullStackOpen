import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthYear = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(UPDATE_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({  variables: { name: name.value, setBornTo: parseInt(born) } })

    setBorn('')
    setName(null)

  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <div>
      <form onSubmit={submit}>
        <div>
          <Select
        defaultValue={name}
        onChange={setName}
        options={authors.map(a => ({ value: a.name, label: a.name}))}
      />
        </div>
        <div>
          born:
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

export default SetBirthYear
