import { useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        console.log(username, password);
        const response = await fetch('http://localhost:4000/login', {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });

        if (response.ok) {
            nav('/');
        }else {
            alert("Wrong credentials");
        }
    }

    return (
        <div className={`${styles.login}`}>
            <form className={`${styles.login_form}`} onSubmit={(e) => login(e)}>
                <h1>Login</h1>
                <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
                <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <button>login</button>
            </form>
        </div>
    )
}

export default Login;