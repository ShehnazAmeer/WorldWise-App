import styles  from './CountryItem.module.css';
function CountryItem({ country }) {
    
    return (
        <li className={styles.countryItem}>
            <span> {country.countryName} </span>
            <span> {country.countryEmoji} </span>
        </li>
    )
}
export default CountryItem