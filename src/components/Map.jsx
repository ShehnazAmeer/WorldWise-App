import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
export default function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    return (
        <div className={styles.mapContainer} onClick={() => {
            navigate('form')
            
        }}>
            <h1>Map</h1>
            {lng}:{lat}
            <button onClick={() => {
                setSearchParams({ lat: 35, lng: 11 });
            }}>changePosition</button>

        </div>
    )
}