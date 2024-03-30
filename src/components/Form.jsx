// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities} from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import {Message, Spinner, BackButton, Button} from '../components'


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const {createCity, isLoading } = useCities();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [geoCodingError, setGeoCodingError] = useState('')
  const navigate = useNavigate();

  useEffect(function(){
    if(!lat && !lng) return;
    async function fetchCityData(){
      try{
        setIsLoadingGeocoding(true);
        setGeoCodingError('')
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();
        // Checking whether there is country code data.
        if(!data.countryCode) throw new Error("That doesn't seems to be city. Click else where in the map!!!!!👋");

        setCityName(data.city || data.locality || '');
        setCountry(data.countryCode);
        setEmoji(convertToEmoji(data.countryCode))
      } catch(err){
        setGeoCodingError(err.message);
      }finally{
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData()
  }, [lat, lng])

  async function submitHandler(e){
    e.preventDefault();
    if(!cityName ||!date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{
        lat, lng
      }
    };
    await createCity(newCity);
    navigate('/app')
  }

  if(geoCodingError) return <Message message={geoCodingError}/> 
  if(isLoadingGeocoding) return <Spinner/>
  if(!lat && !lng) return <Message message='Start by clicking somewhere on the map!!!' />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ' '}`} onSubmit={submitHandler}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={date => setDate(date)} selected={date} dateFormat='dd/MM/yy'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
