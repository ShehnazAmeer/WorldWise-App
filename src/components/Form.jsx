import { useEffect, useState } from "react";
import styles from './Form.module.css';
import Button from "./Button";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";

import Message from './Messsage';
import Spinner from './Spinner';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CityContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function convertToEmoji(countryCode) {
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());

    return String.fromCharCode(...codePoints);
}


function Form() {
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [date, setDate] = useState(new Date());
    const [note, setNote] = useState('');

    const [lat, lng] = useURLPosition();
    const [isLoadingGeocoding, setIsLoadingGeoCoding] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [geoCodingError, setGeoCodingError] = useState('');
    const { createNewCity, isLoading: isLoadingCity } = useCities();
    
    const navigate = useNavigate();

    

    useEffect(function () {
        if (!lat && !lng) return;
        async function fetchCityData() {
            try {
                setIsLoadingGeoCoding(true);
                setGeoCodingError('');

                const res = await fetch(`${BASE_URL}?Latitude=${lat}&longitude=${lng}`);
                
                const data = await res.json();

                if (!data.countryCode) throw new Error("that doesn't seem to be city. Click somewhere Else!");

                setCityName(data.city || data.locality || '');
                setCountryName(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
                
            }
            catch (err) {
                // alert('there is error in fetch city')
                setGeoCodingError(err.message);
            }
            finally {
                setIsLoadingGeoCoding(false);
            }
        }
        fetchCityData()
    }, [lat, lng]);

   async function handleSubmit(e) {
        e.preventDefault();
        if (!cityName && !date&&!note) return;
        const newCityObj = {
            cityName,
            countryName,
            emoji,
            date,
            note,
            position: { lat, lng },
        };
        await createNewCity(newCityObj);
        navigate('/app/cities')
    }

    if (!lat && !lng) return <Message message='start by clicking somewhere on map'/>

    if(isLoadingGeocoding) return <Spinner/>

    if( geoCodingError) return <Message message={geoCodingError}/>
    
    return (
        <form className={`${styles.form} ${isLoadingCity? styles.loading:''}`}onSubmit={handleSubmit}>
            {/* CityName */}
            <div className={styles.row}>
                <label htmlfor='cityName'>City Name</label>
                <input
                    id='cityName'
                    value={cityName}
                    onChange={(e) => { setCityName(e.target.value) }}
                />
                <span className={styles.flag}> {emoji} </span>
            </div>
            {/* Date */}
            <div className={styles.row}>
                <label htmlfor='date'>When did you go to</label>
                
                {/* <input
                    id='date'
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                /> */}

                <DatePicker
                    id='date'
                    onChange={date => setDate(date)}
                    selected={date}
                    dateFormate='dd/MM/yyyy'
                />
            </div>
            {/* Notes */}
            <div className={styles.row}>
                <label htmlfor='note'>Notes about your trip to</label>
                <input
                    id='note'
                    value={note}
                    onChange={(e)=>setNote(e.target.value)}
                />
            </div>
            {/* Buttons */}
            <div className={styles.buttons} >
                <Button
                    type='primary'
                >
                    Add
                </Button>
                <BackButton />
            </div>
        </form>
    )
}
export default Form;