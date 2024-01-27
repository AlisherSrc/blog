import { useState } from 'react';
import styles from './register.module.css';

const Register = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');


    return (
        <div className={`${styles.register}`}>
            <form className={`${styles.register_form}`}>
                <h1>Register</h1>
                <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                <button>register</button>
            </form>
        </div>
    )
}

export default Register;