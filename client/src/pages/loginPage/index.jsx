import { useContext, useState } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { HOST } from '../../globals';


const Login = () => {
    const {setUserInfo} = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        const response = await fetch(`${HOST}/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                console.log(userInfo);
                nav("/");
            });
            
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