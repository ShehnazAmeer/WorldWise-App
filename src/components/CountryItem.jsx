import styles  from './CountryItem.module.css';
function CountryItem({ country }) {
    
    return (
        <li className={styles.countryItem}>
            <span> {country.country} </span>
            <span> {country.emoji} </span>
        </li>
    )
}
export default CountryItem