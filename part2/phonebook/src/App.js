import React, {useState} from 'react';

const Filter = ({currValue, onChangeFunction}) => {
  return (
  <div>
    filter shown with
    <input value={currValue} onChange={onChangeFunction}/>
  </div>
  )
}

const PersonSubmitForm = ({nameStateValue, numberStateValue, nameOnChangeFunction, numberOnChangeFunction, submitFunction}) => {
  return(
    <form onSubmit={submitFunction}>
      <div>
        name: 
        <input
          value={nameStateValue}
          onChange={nameOnChangeFunction}
        />
      </div>
      <div>
        number:
        <input
          value={numberStateValue}
          onChange={numberOnChangeFunction}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const DispPersons = ({persons}) => {
  return(
    <div>
      {persons.map(person =>
        <div key={person.id}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const submitPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)){
      window.alert(`${newName} is already added to the phonebook`)
      return
    }
    const submittedPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(submittedPerson))
    setNewName('')
    setNewNumber('')
  }

  const nameOnChangeHandle = (event) => {
    setNewName(event.target.value)
  }

  const numberOnChangeHandle = (event) => {
    setNewNumber(event.target.value)
  }

  const nameFilterOnChangeHandle = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = (nameFilter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter currValue={nameFilter} onChangeFunction={nameFilterOnChangeHandle} />
      <h2>add a new</h2>
      <PersonSubmitForm
        nameStateValue = {newName}
        numberStateValue = {newNumber}
        nameOnChangeFunction = {nameOnChangeHandle}
        numberOnChangeFunction = {numberOnChangeHandle}
        submitFunction = {submitPerson}
      />
      <h2>Numbers</h2>
      <DispPersons persons={personsToShow} />
    </div>
  )
}

export default App;
