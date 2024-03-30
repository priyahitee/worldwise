import React from 'react'
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({city}) {
    const {currentCity, deleteCity} = useCities()
    const {emoji, cityName, date, id, position} = city;

    function deleteHandler(e){
      e.preventDefault();
      deleteCity(id)
    }

  return (
    <li >
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active']: ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>{formatDate(date)}</time>
          <span className={styles.deleteBtn}onClick={deleteHandler}>&times;</span>
      </Link>
    </li>
  )
}
