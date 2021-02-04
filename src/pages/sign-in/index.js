import React, {useState,useEffect} from 'react';
import styles from './index.module.css';
import {Link, useHistory} from "react-router-dom";
import useForm from "../../customHook/useForm";
import firebase from "firebase";

const SignInPage = () =>{

    let history = useHistory()
    const [note,setNote] = useState('')

    useEffect(() => {
        const db = firebase.database();
    },[])

    const submit = () => {
        firebase.auth().signInWithEmailAndPassword(form.email,form.password)
            .then((e) => {

                firebase.auth().currentUser.getIdToken(true)
                    .then((idToken) => {
                        localStorage.setItem('token',idToken)
                    })
                    .then(()=>{
                        history.push("/dashboard")
                    })
            })
            .catch(e => {
                setNote(e.message)
            })



    }


    const { handleOnChange , handleSubmit, form ,err } = useForm(submit)



    return (
        <div className={styles.signInPage}>
            <h2> Sign In </h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                    <label htmlFor="email"> Email </label>
                    <input name='email' type="email" id='email' value={form.email} onChange={handleOnChange} />
                    {err.email && (<p className={styles.pError}> {err.email} </p>)}
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password"> Password </label>
                    <input name='password' type="password" id='password' value={form.password} onChange={handleOnChange} />
                    {err.password && (<p className={styles.pError}> {err.password} </p>)}
                </div>
                <div className={styles.formItem}>
                    <button type="submit"> Sign In </button>
                    <p> <Link to='/sign-up'> Sign Up </Link> if you dont have an account. </p>
                </div>
            </form>
            {note &&  (<p className={styles.pError}> {note} </p>)}
        </div>
    )
}
export default SignInPage;