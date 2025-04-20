import styles from './City.module.css';
import { useParams, useSearchParams } from 'react-router-dom';
function City() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    console.log(lat, lng);
    return (
        <div className={styles.city} >
            City {id}
            Position: {lat}:{lng}
            <button onClick={() => {
                setSearchParams({ lat: 35, lng: 11 });
            }}>changePosition</button>
        </div>
    ) 
}
export default City;