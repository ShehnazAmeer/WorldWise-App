import { useState } from "react";
import styles from './Form.module.css';
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Form() {
    const [cityName, setCityName] = useState('');
    const [date, setDate] = useState(new Date());
    const [note, setNote] = useState('');
    const [country, setCountry] = useState('');
    const navigate = useNavigate();

    return (
        <form className={styles.form}>
            {/* CityName */}
            <div className={styles.row}>
                <label htmlfor='cityName'>City Name</label>
                <input
                    id='cityName'
                    value={cityName}
                    onChange={(e) => { setCityName(e.target.value) }}
                />
            </div>
            {/* Date */}
            <div className={styles.row}>
                <label htmlfor='date'>When did you go to</label>
                <input
                    id='date'
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
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
                <Button
                    type='back'
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1)
                    } }
                >
                    &larr;Back
                </Button>
            </div>
        </form>
    )
}
export default Form;