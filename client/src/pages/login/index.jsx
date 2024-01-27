import styles from './login.module.css';

const Login = () => {

    return (
        <div className={`${styles.login}`}>
            <form className={`${styles.login_form}`}>
                <h1>Login</h1>
                <input type='text' placeholder='username'/>
                <input type='passwprd' placeholder='password' />
                <button>login</button>
            </form>
        </div>
    )
}

export default Login;