import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

// function ProtectedRoutes({children}) {
function ProtectedRoutes() {

    const authToken = localStorage.getItem("authToken"); 
    const parsedToken = JSON.parse(authToken); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if(!parsedToken){
            navigate("/");
        }
    }, [])

    if(parsedToken){
        // return children;
        return <Outlet />;
    }     
  
}

export default ProtectedRoutes