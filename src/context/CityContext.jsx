import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: [],
    error:''
}

const ACTIONS = {
    isLoading: 'city/loaded',
    getCities: 'cities/created',
    createCurrentCity: 'city/currentCity',
    addNewCity: 'city/addNewCity',
    deleteCity: 'city/deleteCity',
    error:'rejected'  
}

function reducer(state, action) {
    switch (action.type) {
         case ACTIONS.isLoading:
            return (
                {
                    ...state,
                    isLoading: true,
                }
            );
        case ACTIONS.getCities:
            return (
                {
                    ...state,
                    cities: action.payload,
                    isLoading:false,
                }
            );
 
        case ACTIONS.createCurrentCity:
            return (
                {
                    ...state,
                    currentCity: action.payload,
                    isLoading: false,
                    
                }
            );
        case ACTIONS.addNewCity:
            return (
                {
                    ...state,
                    cities: [...state.cities, action.payload],
                    isLoading: false,
                    currentCity:action.payload,
                }
            );
        
        case ACTIONS.deleteCity:
            return (
                {
                    ...state,
                    cities: state.cities.filter(city =>
                        city.id !== action.payload
                    ),
                    isLoading: false,
                    currentCity:{}
                }
            );
        
        case ACTIONS.error:
            return (
                {
                    ...state,
                    isLoading: false,
                    error:action.payload,
                }
            )


        default:
            return state;
    }
}  


function CitiesProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { cities, isLoading, currentCity,error } = state;

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: ACTIONS.isLoading});
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                
                dispatch({ type: ACTIONS.getCities, payload: data });
            }
            catch (err) {
                dispatch({ type: ACTIONS.error, payload: 'There is an Error in fetching Cities Data' });
            }
        }
        fetchCities()
    }, []);

    

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(city => city.countryName).includes(city.countryName))
            return [...arr, { country: city.countryName, emoji: city.emoji }];
        else return arr;
        
    }, []);

    async function getCity(id) {
        if (+id === currentCity.id) return;
        dispatch({ type: ACTIONS.isLoading });
         try { 
             dispatch({ type: ACTIONS.isLoading, payload: true });
            const res = await fetch(`${BASE_URL}/cities/${id}`);

            const data = await res.json();

             dispatch({ type: ACTIONS.createCurrentCity, payload: data });
        }
        catch (err) {
            dispatch({type:ACTIONS.error,payload:'something happend in fetching current city'})
         }
    };

    async function createNewCity(newCity) {
        dispatch({ type: ACTIONS.isLoading });
        
        try { 
            const res = await fetch(`http://localhost:8000/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            dispatch({type:ACTIONS.addNewCity,payload:data})
        }
        catch (err) { 
            dispatch({type:ACTIONS.error,payload:'there was error in creating new City'});
        }
    }

    async function deleteCity(id) {
        
        dispatch({ type: ACTIONS.isLoading });
        try {
           await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
           });
            
            dispatch({ type: ACTIONS.deleteCity, payload: id});  
         }
        catch (err) {
            dispatch({ type: ACTIONS.error, payload: 'There was an error in deleting City' });
         }
    }

    
    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                countries,
                currentCity,
                error,
                getCity,
                createNewCity,
                deleteCity,

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

