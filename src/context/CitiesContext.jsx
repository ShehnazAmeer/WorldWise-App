import { createContext, useContext, useEffect, useReducer, useState } from "react";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const ACTIONS = {
    fetchCitites: 'fetchCities',
    loadedCities: 'isLoaded',
    fetchCurrentCity:'fetchCity',
}

const initialState = {
    cities: [],
    isLoading: false,
    currentCity:{}
    
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.fetchCitites:
            return { ...state, cities: action.payload };
        case ACTIONS.loadedCities:
            return { ...state, isLoading: action.payload };
        case ACTIONS.fetchCurrentCity:
            return { ...state, currentCity: action.payload };
        default:
            return state;
    }
}

function CitiesProvider({ children }) { 
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const { cities, isLoading, currentCity } = state;
    
        const countries = cities.reduce((arr, city) => {
            if (!arr.map(el => el.countryName).includes(city.country)) {
                
               return [...arr, { countryName: city.country, countryEmoji: city.emoji }] 
            } 
            else return arr;
        }, []);
    
    
        useEffect(function () {
            async function fetchCities() {
                try {
                    dispatch({ type: ACTIONS.loadedCities, payload: true });
                    const res = await fetch(`${BASE_URL}/cities`);
                    const data = await res.json();
                    dispatch({type:ACTIONS.fetchCitites,payload:data})
                }
                catch (error) {
                    alert('There is error in loading Data');
                }
                finally {
                    dispatch({ type: ACTIONS.loadedCities, payload: false });
                }
            }
            fetchCities();
        }, []);
    
    async function getCity(id) {
        try {
            dispatch({ type: ACTIONS.loadedCities, payload: true });
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: ACTIONS.fetchCurrentCity, payload: data });
         }
        catch (error) {
            alert('there is something wrong with data')
        }
        finally {
            dispatch({ type: ACTIONS.loadedCities, payload: false });
        }
    }

    return (
        <CitiesContext.Provider value={
            {
                cities,
                countries,
                isLoading,
                currentCity,
                getCity,
            }
        }>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) return 'Provider used outside of its context';

    return context;
}

export { CitiesProvider, useCities };