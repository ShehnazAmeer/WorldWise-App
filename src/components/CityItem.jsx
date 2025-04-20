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

    const { cityName, country, emoji, date, id } = city;

    return (
        <li className={styles.cityItem} >
            <span className={styles.emoji}> {emoji} </span>
            <h3 className={styles.name}> {cityName} </h3>
            <time className={styles.date} > {formatDate(date)} </time>
            <button className={styles.deleteBtn}> &times; </button>
        </li>
    )
}
export default CityItem; 