import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { HOST } from "../../globals";
import Toggle from "../toggle";

const Navbar = () => {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const { isDark, setIsDark } = useContext(UserContext);

    useEffect(() => {
        fetch(`${HOST}/profile`, {
            credentials: "include",
        }).then((res) => {
            res.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    const username = userInfo?.username;

    const logout = () => {
        fetch(`${HOST}/logout`, {
            credentials: 'include',
            method: "POST",
        }).then((val) => {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }).catch((err) => console.log(err));
        setUserInfo(null);
    }

    return <>
        <Link to="/" className={`${styles.logo}`}>AlisherSk Blog</Link>
        <nav>
            {username && (
                <>
                    <Link to="/create">Create new post</Link>
                    <a onClick={logout}>Logout</a>
                </>
            )}
            {!username && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
            <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />

        </nav>
    </>
}

export default Navbar;