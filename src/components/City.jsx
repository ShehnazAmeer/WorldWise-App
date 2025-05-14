
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './City.module.css';
import { useCities } from '../context/CityContext';
import { useEffect } from 'react';
import BackButton from './BackButton';
import Spinner from './Spinner';

const formatDate = (date) => new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
}).format(new Date(date));

function City() {
    const { id } = useParams();
    const { currentCity, getCity,isLoading } = useCities();
    
    useEffect(function () {
        getCity(id)
    }, [id]);


    const { cityName, emoji, date, notes } = currentCity;

    if (isLoading) return <Spinner />
    
    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City Name</h6>
                <h3>
                    <span>{emoji} {cityName} </span>
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
            <div>
                <BackButton/>
            </div>
       </div>
    ) 
}
export default City;