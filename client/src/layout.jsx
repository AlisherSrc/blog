import Navbar from "./components/navbar";

import { Outlet } from 'react-router-dom';

const Layout = () => {

    return (
        <main>
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