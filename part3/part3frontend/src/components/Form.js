import personService from '../services/persons'

const Form = (p) => {
    const addName = (e) => {
      e.preventDefault()
      const nameObject= {
        name: p.newName,
        number: p.newNumber,
      }
      const existingName = p.persons.find(x=> x.name === nameObject.name);
      if(existingName){
        if(window.confirm(`${p.newName} is already added to the phonebook,
        replace the old number with a new one?`)){
          personService
          .update(p.persons.indexOf(existingName)+1,nameObject)
          personService
          .getAll()
          .then(updatedPersons => {
          p.setPersons(updatedPersons)
          p.setSuccessMessage(`${p.newName} was updated in the phonebook`)
          setTimeout(() => {
            p.setSuccessMessage(null)
          }, 3000)
          })
        }
      } 
      else{
        personService
        .create(nameObject)
        .then(returnedName => {
        p.setPersons(p.persons.concat(returnedName))
        p.setSuccessMessage(`${p.newName} was added to the phonebook`)
        setTimeout(() => {
          p.setSuccessMessage(null)
        }, 3000)
      })}
      p.setNewName('')
      p.setNewNumber('')
    }
  return (
  <form onSubmit={addName}>
          <div>
            name: <input value={p.newName}
            onChange={p.handleNameChange}/>
          </div>
          <div>
            number: <input value={p.newNumber}
            onChange={p.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
  )
  }

  export default Form