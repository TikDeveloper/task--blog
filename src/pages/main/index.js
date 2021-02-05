import React from "react";
import styles from './index.module.css';
import {Link} from 'react-router-dom';


const MainPage = () => {
    return (

        <div className={styles.mainPage}>
            <h1> Hello </h1>
            <nav className={styles.nav}>
                <Link to='/sign-in'> Sign In </Link>
                <Link to='/sign-up'> Sign up </Link>
                {localStorage.getItem('token') && <Link to='/dashboard'> Dashboard </Link>}
            </nav>
        </div>


    )
}


export default MainPage;