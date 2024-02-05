import { useState } from 'react';
import styles from './register.module.css';
import { HOST } from '../../globals';

const Register = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();

        const response = await fetch(`${HOST}/register`,{
            method: "POST",
            body: JSON.stringify({username,password}),
            headers: {"Content-Type":"application/json"},
        });
        if(response.status === 200){
            alert('registration was successfull');
        }else{
            alert('registration failed');
        }

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