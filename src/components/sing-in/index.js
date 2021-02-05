import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import firebase from "firebase";
import styles from "./index.module.css";


const SignIn = () =>{
    let history = useHistory()
    const [err,setErr] = useState()
    const [loader,setLoader] = useState(false)


    const validationSchema = Yup.object({
        email: Yup.string()
            .email('invalid email address').required('*required field'),
        password: Yup.string()
            .min(6,'must be more 6 characters')
            .max(12, 'must be 12 characters or less')
            .required('*required field'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            setLoader(true)
            const auth = firebase.auth();
            auth.signInWithEmailAndPassword(values.email,values.password)
                .catch(err => setErr(err.message))

            auth.onAuthStateChanged(user => {
                if(user){
                    setLoader(false)
                    localStorage.clear()
                    localStorage.setItem('token',user.refreshToken)
                    history.push('/dashboard',user.email)
                }
            })

        }
    })

    return (
        <div className={styles.signInPage}>
            <h2> Sign In </h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formItem}>
                    <label htmlFor="email"> Email </label>
                    <input
                        name='email'
                        type="email"
                        id='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <div className={styles.pError}>{formik.errors.email}</div> : null}
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password"> Password </label>
                    <input
                        name='password'
                        type="password"
                        id='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? <div className={styles.pError}>{formik.errors.password}</div> : null}
                </div>
                <div className={`${styles.formItem} ${styles.formItemLast}`}>
                    <button type="submit"> Sign In </button>
                    <p> <Link to='/sign-up'> Sign Up </Link> if you dont have an account. </p>
                </div>


                {err && <p className={styles.pError}> {err} </p>}
                {loader &&
                <div className={styles.loader}>
                    <div className={styles.ldsRing}>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                    </div>
                </div>
                }
            </form>

        </div>
    )
}

export default SignIn;