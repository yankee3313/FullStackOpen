import personService from '../services/persons'

const Note = (p) => {
  const remove = (id) => {
    if (window.confirm(`Do you really want to delete ${p.name}?`))
    personService
      .deleteName(id)
      .then(response => {
        p.setPersons(p.persons.filter(p=> p.id !== id))
        p.setSuccessMessage(`${p.name} was deleted from the phonebook`)
          setTimeout(() => {
            p.setSuccessMessage(null)
          }, 3000)
      })
      .catch(error => {
        p.setErrorMessage(`The name ${p.name} was already deleted from the server.`)
      })
      setTimeout(() => {
        p.setErrorMessage(null)
      }, 3000)
  } 
  const name = p.name;
  if (name.replaceAll(/\s/gi, '').toLowerCase().includes(p.searchItem.toLowerCase()))
    return (
      <div>
        <li>{p.name} {p.number}
          <button onClick={()=> remove(p.id)} >delete</button>
        </li>
      </div>
    )
}

export default Note