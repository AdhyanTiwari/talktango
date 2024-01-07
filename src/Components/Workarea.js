import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Workarea() {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Workarea