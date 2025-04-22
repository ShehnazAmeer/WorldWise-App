import styles from './CountriesList.module.css';
import CountryItem from './CountryItem';
import { useCities } from '../context/CitiesContext';

function CountriesList() { 
    const {countries}=useCities()
    console.log(countries)
    return (
        <ul className={styles.countryList} >
            {
                countries.map(country=> <CountryItem key={country.countryName} country={country} /> )
            }
       </ul>
    )
}
export default CountriesList;