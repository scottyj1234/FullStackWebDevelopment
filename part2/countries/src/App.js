import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './App.css';

const CountryLanguages = ({languages}) => {
  const keyValueLanguages = Object.entries(languages)
  console.log('key value languages: ', keyValueLanguages)
  if (keyValueLanguages.length === 0){
    return <></>
  }

  return (
    <ul>
      {keyValueLanguages.map(keyValue => (
        <li key={keyValue[0]}>{keyValue[1]}</li>
      ))}
    </ul>
  )
}

const CountryList = ({countries, countryClickHandle}) => {
  return (
    countries.map(country => (
      <div key={country.ccn3}>
        {country.name.common} <button onClick={() => countryClickHandle(country.name.common)}>show</button>
      </div>
    ))
  )
}

const CountryDetails = ({country}) => {
  const countryName = country.name.common
  const countryCapital = (country.capital) ? country.capital[0] : "No established capital"
  const countryPopulation = country.population
  const countryLanguages = country.languages

  return (
    <div>
      <h1>{countryName}</h1>
      {<p>capital {countryCapital}</p>}
      <p>population {countryPopulation}</p>
      <h2>languages</h2>
      <CountryLanguages languages={countryLanguages} />
      <img src={country.flags['png']} alt={countryName + ' flag'}></img>
    </div>
  )
}

const CountriesOutput = ({countries, search, countryClickHandle}) => {
  const searchLowerCase = search.toLowerCase()
  const countrySearch = countries.filter(country => country.name.common.toLowerCase().includes(searchLowerCase))
  const countryPerfectMatch = countrySearch.filter(country => country.name.common.toLowerCase() === searchLowerCase)

  if (search === ''){
    return <></>
  }
  else if (countryPerfectMatch.length === 1){
    return <CountryDetails country={countryPerfectMatch[0]} />
  }
  else if (countrySearch.length === 1) {
    return <CountryDetails country={countrySearch[0]} />
  }else if (countrySearch.length > 10) {
    return (
    <div>
      Too many matches, specify another filter
    </div>)
  } else if (countrySearch.length > 1) {
    return <CountryList countries={countrySearch} countryClickHandle={countryClickHandle} />
  } else {
    return <div>No matches</div>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('countries received')
        setCountries(response.data)
      })
  }, [])

  const handleCountrySearchChange = (event) => {
    setCountrySearch(event.target.value)
  }

  const handleCountryClick = (countryName) => {
    setCountrySearch(countryName)
  }

  return (
    <div>
      find countries
      <input value={countrySearch} onChange={handleCountrySearchChange}></input>
      <br></br>
      <CountriesOutput countries={countries} search={countrySearch} countryClickHandle={handleCountryClick} />
    </div>
  );
}

export default App;
