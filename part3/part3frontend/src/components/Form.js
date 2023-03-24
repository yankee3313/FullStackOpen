import personService from '../services/persons'

const Form = (p) => {
    const addName = (e) => {
      e.preventDefault()
      const nameObject= {
        name: p.newName,
        number: p.newNumber,
      }
      const existingName = p.persons.find(x=> 
        x.name.toLowerCase() === nameObject.name.toLowerCase());
      if(existingName){
        if(window.confirm(`${p.newName} is already added to the phonebook,
        replace the old number with a new one?`)){
          personService
          .update(existingName.id,nameObject)
          .then(() => {
            p.setSuccessMessage(`${p.newName} was updated in the phonebook`)
            setTimeout(() => {
              p.setSuccessMessage(null)
            }, 5000)
            p.setNewName('')
            p.setNewNumber('')
          })
          .catch(error => {
            console.log(error.response.data.error)
            p.setErrorMessage(error.response.data.error)
            setTimeout(() => {
              p.setErrorMessage(null)
            }, 5000)
          })
          personService
          .getAll()
          .then(updatedPersons => {
          p.setPersons(updatedPersons)
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
        }, 5000)
        p.setNewName('')
        p.setNewNumber('')
      }).catch(error => {
          console.log(error.response.data.error)
          p.setErrorMessage(error.response.data.error)
          setTimeout(() => {
            p.setErrorMessage(null)
          }, 5000)
        })
      }
    
    }
  return (
  <form onSubmit={addName}>
          <div>
            name: <input value={p.newName}
            onChange={p.handleNameChange}/>
          </div>
          <div>
            number: <input value={p.newNumber}
            onChange={p.handleNumberChange}
            placeholder="000-000-0000"/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
  )
  }

  export default Form