import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = 'http://localhost:8000';

// Create a context
const CitiesContext = createContext();

// Providing a value to all children components by creating a own custom context provider component.
function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
      async function fetchCities() {
        try {
          setIsLoading(true)
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          setCities(data);
        } catch {
          alert('There was an error in loading data!!!!')
        } finally {
          setIsLoading(false)
        }
      }
      fetchCities();
    }, [])

    async function getCity(id) {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch {
        alert('There was an error in loading data!!!!')
      } finally {
        setIsLoading(false)
      }
    }

    async function createCity(newCity) {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`, {
          method: "POST",
          body: JSON.stringify(newCity),
          headers:{
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setCities(cities => [data, ...cities])
      } catch {
        alert('There was an error in loading data!!!!')
      } finally {
        setIsLoading(false)
      }
    }

    async function deleteCity(id) {
      try {
        setIsLoading(true)
        await fetch(`${BASE_URL}/cities/${id}`, {
          method: "DELETE",
        });
        setCities(cities.filter(city=> city.id !== id));
      } catch {
        alert('There was an error in deleting data!!!!')
      } finally {
        setIsLoading(false)
      }
    }

    return (
        <CitiesContext.Provider value={{ 
          cities, 
          isLoading,
          getCity,
          currentCity,
          createCity,
          deleteCity
          }}>
            {children}
        </CitiesContext.Provider>
    )
}



// Consuming a value with help of own custom hooks
function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error(`CitiesContext was used outside the Cities Provider!`);
    return context;
}

export {CitiesProvider, useCities};