import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL='http://localhost:8000'


function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState([]);

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                console.log(data)
                setCities(data);
                setIsLoading(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchCities()
    }, []);

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(city => city.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
        
    }, []);

    async function getCity(id) {
         try { 
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);

            const data = await res.json();

            setCurrentCity(data);
        }
        catch (err) {
            alert('something happend in fetching current city')
         }
        finally {
            setIsLoading(false);
        }  
    }

    
    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                countries,
                currentCity,
                getCity,

            }}
        >
            {children}

        </CitiesContext.Provider>
    )
 }

function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) return 'provider used outside of it\'s context' 
    
    return context;
}

export {CitiesProvider, useCities}

