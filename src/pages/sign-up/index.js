import React, {useState,useEffect} from 'react';
import styles from './index.module.css';
import {Link,useHistory} from "react-router-dom";
import firebase from "firebase";
import useFormReg from "../../customHook/useFormReg";


const SignUpPage = () => {
    let history = useHistory()
    const [note,setNote] = useState('')

    useEffect(() => {
        const db = firebase.database();
    },[])

    const submit = () => {
        firebase.auth().createUserWithEmailAndPassword(form.email,form.password)
            .then(() => setNote('You are successfully sign up. !!!'))
            .then(() => {
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


    const { handleOnChange , handleSubmit, form ,err } = useFormReg(submit)


    return (
        <div className={styles.signUpPage}>
            <h2> Sign Up </h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                    <label htmlFor="email"> Email </label>
                    <input
                        name='email'
                        type="email"
                        id='email'
                        value={form.email}
                        onChange={handleOnChange}
                    />
                    {err.email && (<p className={styles.pError}> {err.email} </p>)}
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password"> Password </label>
                    <input
                        name='password'
                        type="password"
                        id='password'
                        value={form.password}
                        onChange={handleOnChange}
                    />
                    {err.password && (<p className={styles.pError}> {err.password} </p>)}
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="passwordConf"> Confirm Password </label>
                    <input
                        name='passwordConf'
                        type="password"
                        id='passwordConf'
                        value={form.passwordConf}
                        onChange={handleOnChange}
                    />
                    {err.passwordConf && (<p className={styles.pError}> {err.passwordConf} </p>)}
                </div>
                <div className={styles.formItem}>
                    <button type="submit"> Sign Up </button>
                    <p> <Link to='/sign-in'> Sign In </Link> if you have an account. </p>
                </div>
            </form>
            {note &&  (<p className={styles.pSuccess}> {note} </p>)}
        </div>
    )
}
export default SignUpPage;