import { useState } from 'react';
import styles from './register.module.css';

const Register = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:4000/register",{
            method: "POST",
            body: JSON.stringify({username,password}),
            headers: {"Content-Type":"application/json"},
        })
    }

    return (
        <div className={`${styles.register}`}>
            <form className={`${styles.register_form}`}>
                <h1>Register</h1>
                <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={(e) => register(e)}>register</button>
            </form>
        </div>
    )
}

export default Register;