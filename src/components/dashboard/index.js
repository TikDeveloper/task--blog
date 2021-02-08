import React ,{useState,useEffect} from 'react';
import styles from "./index.module.css";
import {useHistory} from 'react-router-dom';
import firebase from "firebase";
import Loader from "../loader";
import DashBody from './dashBody';
import CreateTask from "./createTask";

const Dashboard = () => {
    let jsx;
    let history = useHistory();
    const [loader,setLoader] = useState(false)
    const [user] = useState( JSON.parse(localStorage.getItem('token'))  )


    useEffect(() => {
        return () => {
            localStorage.clear()
        }
    })


    const logout = (e) => {
        setLoader(true)
        firebase.auth()
            .signOut()
            .then(() => {
                history.push('/sign-in')
            })
            .finally(() => setLoader(false))
    }


    if(user.uid === 'JiZL8X4SL0XhJvcx3vn7Eth5xx43'){
        jsx = (
            <div className={styles.dashboard}>
                <div className={styles.dashboardHeader}>
                    <h1> Hello Admin</h1>
                    <button onClick={logout}> LogOut </button>
                </div>
                <CreateTask/>
                <div className={styles.dashboardBody}>
                    <DashBody/>
                    {loader && <Loader/>}
                </div>
            </div>
        )
    }
    else{
        jsx = (
            <div className={styles.dashboard}>
                <div className={styles.dashboardHeader}>
                    <h1> Hello {user.email}</h1>
                    <button onClick={logout}> LogOut </button>
                </div>

                <div className={styles.dashboardBody}>
                    <DashBody/>
                    {loader && <Loader/>}
                </div>
            </div>
        )
    }


    return jsx;

}

export default Dashboard;