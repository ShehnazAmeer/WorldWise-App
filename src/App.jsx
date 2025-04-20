import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from './pages/Login';
import CitiesList from "./components/CitiesList";
import CountriesList from "./components/CountriesList";
import './index.css';
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL='http://localhost:8000'

export default function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log(cities)

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.countryName).includes(city.country)) {
            
           return [...arr, { countryName: city.country, countryEmoji: city.emoji }] 
        } 
        else return arr;
    }, []);


    useEffect(function () {
        async function fetchCities() {
            try { 
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            }
            catch (error) { 
                alert('There is error in loading Data');
            }
            finally {
                setIsLoading(false);
            }
         }
        fetchCities()
    },[])

    return (
        <BrowserRouter>
            <Routes>

                <Route index element={<Homepage />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='product' element={<Product />} />

                <Route path='app' element={<AppLayout />}>
                    <Route path='cities' element={<CitiesList cities={cities} isLoading={isLoading} />} />
                    <Route path='cities/:id' element={<City/>} />
                    
                    <Route path='countries' element={<CountriesList countries={countries} />} />
                    <Route path='form' element={<Form/>} />
                    <Route index element={<CitiesList cities={cities} isLoading={isLoading} />}/>
                </Route>

                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<PageNotFound/>}/>
                
            </Routes>
        </BrowserRouter>
    )
}