import React from 'react';
import styles from './index.module.css';
import {Link} from "react-router-dom";

const LoginPage = () =>{

    const handleOnChange = (e) => {
        const val = e.target.value;



        if(val.trim().length > 6){

        }
        else{

        }



    }

    return (
        <div className={styles.signInPage}>
            <h2> Sign In </h2>
            <form>
                <div className={styles.formItem}>
                    <label htmlFor="email"> Email </label>
                    <input type="text" id='email' onChange={handleOnChange}/>
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password"> Password </label>
                    <input type="password" id='password' onChange={handleOnChange}/>
                </div>
                <div className={styles.formItem}>
                    <button type="button"> Sign In </button>
                    <p> <Link to='/'> Sign Up </Link> if you dont have an account. </p>
                </div>
            </form>
        </div>
    )
}
export default LoginPage;