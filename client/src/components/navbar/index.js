import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {

    return <>
        <Link to="/" className={`${styles.logo}`}>BlogLogo</Link>
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    </>
}

export default Navbar;