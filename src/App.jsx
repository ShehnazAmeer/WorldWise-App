import {useEffect, useState} from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from './pages/AppLayout';
import CitiesList from "./components/CitiesList";
import CountriesList from "./components/CountriesList";
import Form from "./components/Form";
import City from './components/City';
import { CitiesProvider } from './context/CityContext';

export default function App() {
    return (
        <CitiesProvider>
            <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />}/>
                <Route path='pricing' element={<Pricing />}/>
                <Route path='product' element={<Product />}/>
                <Route path='*' element={<PageNotFound />}/>
                <Route path='app' element={<AppLayout />}>
                    
                    
                    
                    {/* <Route index element={<CitiesList cities={cities} isLoading={isLoading} />} /> */}

                    <Route index element={<Navigate to='cities' replace/>}/>
                    
                    <Route path='cities' element={<CitiesList />} />

                    <Route path='cities/:id' element={<City/>} />

                    <Route path='countries' element={<CountriesList  />} />
                    <Route path='form' element={<Form/>} />
                </Route>
           </Routes>
            </BrowserRouter>
        </CitiesProvider>
        
    )
}


//use Params();
// to save the data into URL
//1: create new route
//2: link to that route
//3:read states from that URL