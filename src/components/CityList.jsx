import React from 'react'
import styles from './CityList.module.css'
import {Spinner, CityItem, Message} from '../components'
import { useCities } from '../contexts/CitiesContext';

export default function CityList() {
  // Reading a value from context
  const {cities, isLoading} = useCities();

  if(isLoading) return <Spinner/>;
  if(!cities.length) return <Message message='Add your city by clicking on one city in the world map!'/>
  return (
    <ul className={styles.cityList}>
      {cities.map(city=> (
        <CityItem city={city} key={city.id}/>
      ))}
    </ul>
  )
}
