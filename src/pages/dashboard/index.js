import React from "react";
import styles from './index.module.css';
import {useHistory} from 'react-router-dom';


const DashboardPage = () => {
    let history = useHistory();
    const logout = (e) =>{
        localStorage.removeItem('token')
        history.push('/sign-in')
    }

    return (

        <div>
            <h1> Hello </h1>
            <button onClick={logout}> LogOut </button>
        </div>


    )
}


export default DashboardPage;