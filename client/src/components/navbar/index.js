import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { HOST } from "../../globals";

const Navbar = () => {
    const {setUserInfo,userInfo} = useContext(UserContext);

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
    },[]);

    const username = userInfo?.username;

    const logout = () => {
        fetch(`${HOST}/logout`,{
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
                    <Link to="/create">Create new post</Link>
                    <a onClick={logout}>Logout</a>
                </>
            )}
        </nav>
    </>
}

export default Navbar;