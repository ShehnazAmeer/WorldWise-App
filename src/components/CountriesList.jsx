import styles from './CountriesList.module.css';
import CountryItem from './CountryItem';
function CountriesList({countries}) {  
    return (
        <ul className={styles.countryList} >
            {
                countries.map(country=> <CountryItem key={country.countryName} country={country} /> )
            }
       </ul>
    )
}
export default CountriesList;