import { useCities } from '../context/CityContext';
import styles from './CountriesList.module.css';

import CountryItem from './CountryItem';


function CountriesList() { 
    const { countries } = useCities();

    return (
        <ul className={styles.countryList} >
            {
                countries.map(country=> <CountryItem key={country.country} country={country} /> )
           }
       </ul>
    )
}
export default CountriesList;