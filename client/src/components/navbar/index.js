import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

const Navbar = () => {
    const {setUserInfo,userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include",
        }).then((res) => {
            res.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    },[]);

    const username = userInfo?.username;

    const logout = () => {
        fetch("http://localhost:4000/logout",{
            credentials: 'include',
            method: "POST",
        });
        setUserInfo(null);
    }

    return <>
        <Link to="/" className={`${styles.logo}`}>BlogLogo</Link>
        <nav>
            {username && (
                <>
                    <Link to="create">Create new post</Link>
                    <a onClick={logout}>Logout</a>
                </>
            )}
        </nav>
    </>
}

export default Navbar;