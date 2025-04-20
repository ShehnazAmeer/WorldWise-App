import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

function formatDate(date) {
    return new Intl.DateTimeFormat(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        weekday:'long',
        
    }).format(new Date(date));
}

function CityItem({ city }) {

    const { cityName, country, emoji, date, id,position } = city;
    const { lat, lng } = position;

    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={styles.emoji}> {emoji} </span>
                <h3 className={styles.name}> {cityName} </h3>
                <time className={styles.date} > {formatDate(date)} </time>
                <button className={styles.deleteBtn}> &times; </button>
            </Link>
            
        </li>
    )
}
export default CityItem; 