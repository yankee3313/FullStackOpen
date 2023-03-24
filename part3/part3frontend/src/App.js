import { useState, useEffect } from 'react'
import personService from './services/persons'
import Form from './components/Form'
import Note from './components/Note'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import ErrorMessage from './components/ErrorMessage'
import Success from './components/Success'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterNames = (e) => {
    setSearchedName(e.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Success message={successMessage}/>
      <ErrorMessage message={errorMessage}/>
      <SearchBar searchedName={searchedName} 
                 filter={handleFilterNames}/>
      <h2>Add New Contact</h2>
        <Form newName={newName} newNumber={newNumber}
              persons={persons} setNewName={setNewName}
              setNewNumber={setNewNumber}
              setPersons={setPersons}
              handleNameChange={handleNameChange}
              handleNumberChange={handleNumberChange}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}/>
      <h3>Numbers</h3>
          {persons.map(x => <Note key={x.id} 
                                  name={x.name} 
                                  number={x.number} 
                                  searchItem={searchedName}
                                  persons={persons}
                                  id={x.id}
                                  setPersons={setPersons}
                                  setErrorMessage={setErrorMessage}
                                  setSuccessMessage={setSuccessMessage}
                                  />)
          }
      <Footer />
    </div>
  )
}

export default App