import styles from './City.module.css';
import { useParams, useSearchParams } from 'react-router-dom';

function formatDate(date) {
    new Intl.DateTimeFormat('en', {
        dat: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    }).format(new Date(date));
}

function City() {
    const { id } = useParams();



    const currentCity = {
        cityName: 'lisbon',
        emoji: '🇵🇹',
        date: '2027-10-31T15:59:59.138Z',
        notes:'My favorite city so far!'
    }

    const { cityName, emoji, date, notes } = currentCity;


    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City Name</h6>
                <h3>
                    <span> {cityName} </span>
                </h3>

            </div>
            <div className={styles.row}>
                <h6>You Went to {cityName} on</h6>
                <p> {formatDate(date||null)} </p>
            </div>
            <div className={styles.row}>
                <h6>Your notes</h6>
                <p> {notes} </p>
            </div>
            <div className={styles.row}>
                <h6>Learn More</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    Check Out ${cityName} on WikiPedia &rarr;
                </a>
            </div>
            <div></div>
       </div>
    ) 
}
export default City;