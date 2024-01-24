import styles from "./navbar.module.css";

const Navbar = () => {

    return <>
        <a href="#" className={`${styles.logo}`}>BlogLogo</a>
        <nav>
            <a href="#">Login</a>
            <a href="#">Register</a>
        </nav>
    </>
}

export default Navbar;