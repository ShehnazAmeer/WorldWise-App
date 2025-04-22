import { useCities } from '../context/CitiesContext';
import styles from './CitiesList.module.css';
import CityItem from './CityItem';
import Message from './Messsage';

import Spinner from './Spinner';

function CitiesList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return (<Spinner />);
    
    if (cities.length === 0) return (<Message message='Add you first city by clicking on a map' />);
   
    return (
        <ul className={styles.cityList}>
            {
                cities.map(city=><CityItem key={city.id} city={city} />)
            }
       </ul>
    )
}
export default CitiesList;