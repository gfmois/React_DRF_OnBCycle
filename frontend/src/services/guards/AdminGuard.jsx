import React, { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

// FIXME: Not working Guard
function AdminGuard() {
    const { isAdmin } = useContext(AuthContext)

    return isAdmin
        ? <Outlet />
        : <Navigate to={'/'} />
}

export default AdminGuard