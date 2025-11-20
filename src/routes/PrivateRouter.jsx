import { Outlet, Navigate } from 'react-router-dom'

function PrivateRouter() {
    const userToken = localStorage.getItem("token") !== null

    return userToken ? <Outlet /> : <Navigate to="/auth/login" />;

}


export default PrivateRouter