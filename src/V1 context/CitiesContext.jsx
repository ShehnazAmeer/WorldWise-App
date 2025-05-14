import { useReducer, createContext, useEffect, useContext, useCallback } from 'react';

// 1: create context component by using createContext() func
// 2: to context component accept children prop and 
// 3: context component have all state logic and return provider compoentet by reading provide propertry on context compoent by setting value object
//4: 

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const ACTIONS = {
    fetchCitiesData: 'cities/loaded',
    getCity: 'city/loaded',
    createCity: 'city/created',
    deleteCity: 'city/deleted',
    loading: 'isLoading',
    error:'rejected',
}

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error:'',
}

function reduce(state,action) {
    switch (action.type) {
        case ACTIONS.error:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case ACTIONS.fetchCitiesData:
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case ACTIONS.loading:
            return { ...state, isLoading: true }
        
        case ACTIONS.getCity:
            return {
                ...state,
                isLoading: false,
                currentCity:action.payload,
            }
        case ACTIONS.createCity:
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity:action.payload,
            }
        case ACTIONS.deleteCity:
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity:{}
            }
        default:
            return state;
    }
}

function CitiesProvider({ children }) {
    const [state, dispatch] = useReducer(reduce, initialState);
    const { cities, isLoading, currentCity,error } = state;
    
    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: ACTIONS.loading });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: ACTIONS.fetchCitiesData, payload: data });
            }
            catch (err) {
                dispatch({type:ACTIONS.error, payload:'there is an error while loading cities...'});
            } 
        }
        fetchCities()
    }, []);

    const getCity = useCallback(
        async function getCity(id) {
        if (+id === currentCity.id) return;

        dispatch({ type: ACTIONS.loading });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: ACTIONS.getCity, payload: data });
        }
        catch (err) {
            dispatch({ type: ACTIONS.error, payload: 'there was error in loading city...' });
        }
    },[currentCity.id])
    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                error,
                getCity,
            }}
        >
        {children}
        </CitiesContext.Provider>
    ) 
}

function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) throw new Error('cities context used outside of its context');

    return context;
}

export { useCities, CitiesProvider };