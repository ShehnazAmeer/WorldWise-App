import { useState } from 'react';
import styles from './Login.module.css';
import Button from '../components/Button';
import { useAuthentication } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('jack@example.com');
    const [password, setPassword] = useState(123);

    const { login } = useAuthentication();

    function handleLogin() {
        login(email, password);
    }
    return (
        <main className={styles.login}>
            <form className={styles.form} >
                <div className={styles.row} >
                    <label 
                    htmlFor='email'>Email Address</label>
                    <input
                        id='email'
                        type='eamil'
                        onChange={e =>setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className={styles.row} >
                    <label htmlFor={'password'} >Password</label>
                    <input
                        type='password'
                        id={'password'}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />

                </div>
                <div>
                    <Button type='primary' onClick={handleLogin} >Login</Button>
                </div>
            </form>
            
        </main>
    )
}