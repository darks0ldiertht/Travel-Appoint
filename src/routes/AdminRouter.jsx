import { Outlet, Navigate } from 'react-router-dom'

function AdminRouter() {
    const role = localStorage.getItem("Role");
    const isAdmin = role === "Admin";

    return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRouter;
