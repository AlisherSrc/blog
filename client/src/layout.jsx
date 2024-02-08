import { useContext, useEffect } from "react";
import Navbar from "./components/navbar";

import { Outlet } from 'react-router-dom';
import { UserContext } from "./UserContext";


const Layout = () => {
    const {isDark} = useContext(UserContext);

    useEffect(() => {
        if(isDark){
            document.querySelector("body").setAttribute('data-theme','dark');
        }else{
            document.querySelector("body").setAttribute('data-theme','light');
        }
    },[isDark])

    return (
        <main>
        {/* <main data-theme="dark"> */}
            <header>
                <Navbar />
            </header>
            <>
                <Outlet />
            </>
        </main>
    )
}

export default Layout;