import { useState, useEffect } from "react";

function UseAuth() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuth(!!token);
    }, []);

    return isAuth;

}

export default UseAuth;
