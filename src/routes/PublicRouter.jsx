import { Outlet, Navigate } from 'react-router-dom'

function PublicRouter() {
    const userToken = localStorage.getItem("token") !== null

    return !userToken ? <Outlet /> : <Navigate to="/hotels" />
}

export default PublicRouter
