import React, {useState,useEffect} from 'react';
import styles from "./index.module.css";
import {useHistory} from 'react-router-dom';
import firebase from "firebase";


const Dashboard = () => {
    const [user,setUser] = useState()
    let history = useHistory();

    useEffect(() => {
        setUser(history.location.state)
    },[])

    const logout = (e) =>{
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('token')
            history.push('/sign-in')
        })
    }

    let jsx;
    if(user === 'tiko0000.80.tm@gmail.com'){
        jsx = (
            <div className={styles.dashboard}>
                <div className={styles.dashboardHeader}>
                    <h1> Hello {user}</h1>
                    <button onClick={logout}> LogOut </button>
                </div>
                <div className={styles.dashboardBody}>
                    Admin
                </div>
            </div>
        )
    }
    else{
        jsx = (
            <div className={styles.dashboard}>
                <div className={styles.dashboardHeader}>
                    <h1> Hello {user}</h1>
                    <button onClick={logout}> LogOut </button>
                </div>
                <div className={styles.dashboardBody}>
                    User
                </div>
            </div>
        )
    }


    return jsx;

}

export default Dashboard;