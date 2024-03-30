import React from 'react'
import styles from './CountryList.module.css'
import {Spinner, CountryItem, Message} from '../components'
// import Spinner from './Spinner'
// import CityItem from './CityItem';
// import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

export default function CountryList() {
    // Reading a value from context
  const {cities, isLoading} = useCities();

  if(isLoading) return <Spinner/>;
  if(!cities.length) return <Message message='Add your city by clicking on one city in the world map!'/>;

  const countries = cities.reduce((arr, city) => {
    if(!arr.map(el => el.country).includes(city.country))
    return [...arr, { country:city.country, emoji: city.emoji}]
    else return arr;
  }
  , []);

  return (
    <ul className={styles.countryList}>
      {countries.map(country=> (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}
