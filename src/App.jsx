import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from './context/CitiesContext';
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

export default function App() {

    return (
        <CitiesProvider>
            <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='product' element={<Product />} />

                <Route path='app' element={<AppLayout />}>
                   
                        <Route path='cities' element={<CitiesList />} />
                     
                        {/* <Route index element={<CitiesList cities={cities} isLoading={isLoading} />} /> */}
                        
                        <Route index element={<Navigate replace to='cities' />} />

                        <Route path='cities/:id' element={<City/>} />
                        
                        <Route path='countries' element={<CountriesList />} />

                        <Route path='form' element={<Form />} /> 
                </Route>

                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<PageNotFound/>}/>
                
            </Routes>
        </BrowserRouter>
        </CitiesProvider>
        
    )
}