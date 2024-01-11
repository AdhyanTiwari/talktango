import React, { createContext, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export const myContext = createContext();
function Workarea() {

    const [refresh, setRefresh] = useState(true);

    return (
        <>
            <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
                <Sidebar />
                <Outlet />
            </myContext.Provider>
        </>
    )
}

export default Workarea