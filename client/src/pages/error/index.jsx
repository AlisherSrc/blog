import styles from './error.module.css';

const ErrorPage = () => {

    return (
        <div className={`${styles.body_404}`}>
            <div id="message">
                <h2>404</h2>
                <h1>Page Not Found D:</h1>
            </div>
        </div>
    )
}

export default ErrorPage;