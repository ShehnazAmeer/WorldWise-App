
import styles from './CitiesList.module.css';
import CityItem from './CityItem';
import Spinner from './Spinner';
import Message from './Messsage';
import { useCities } from '../context/CityContext';


function CitiesList() {
    const { isLoading, cities } = useCities();
    
    if (isLoading) return <Spinner />
    
    if(cities.length===0) return <Message message='No data found to display' />
   
    return (
        <ul className={styles.cityList}>
          {cities.map(city=><CityItem key={city.id}  city={city} /> )}
          
       </ul>
    )
}
export default CitiesList;