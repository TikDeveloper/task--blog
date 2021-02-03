import React, {useState} from 'react';
import styles from './index.module.css';
import {Link} from "react-router-dom";

const LoginPage = () =>{
    const [form,setForm] = useState({email:'',password:''});


    const validateForm = (x) =>{
        if(x.email === ''){
            console.log('require E')
        }
        if(x.password === ''){
            console.log('require P')
        }
    };



    const handlerOnChange = (e) => {


        setForm({...form, [e.target.name] : e.target.value} );

        validateForm(form)

    };


    return (
        <div className={styles.signInPage}>
            <h2> Sign In </h2>
            <form>
                <div className={styles.formItem}>
                    <label htmlFor="email"> Email </label>
                    <input name='email' type="email" id='email' value={form.email} onChange={handlerOnChange()} />
                    <p className={styles.pError}> Please type at least 6 letters </p>
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password"> Password </label>
                    <input name='password' type="password" id='password' value={form.password} onChange={handlerOnChange} />
                    <p className={styles.pError}> Please type at least 6 letters </p>
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