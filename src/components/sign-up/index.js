import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import firebase from "firebase";
import styles from "./index.module.css";
import Loader from '../loader';

const SignUp = () => {
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
        passwordConf: Yup.string()
            .oneOf([Yup.ref('password'), null], 'passwords must match').required('*required field')
    })


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConf: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            setLoader(true)
            firebase
                .auth()
                .createUserWithEmailAndPassword(values.email,values.password)
                .then(event => {
                    localStorage.clear()
                    localStorage.setItem('token',JSON.stringify({uid: event.user.uid ,email: event.user.email }))
                })
                .then(() => history.push('/dashboard'))
                .finally(() => setLoader(false))
                .catch(err => setErr(err.message))
        }
    })





    return (
        <div className={styles.signUpPage}>
            <h2> Sign Up </h2>
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
                <div className={styles.formItem}>
                    <label htmlFor="passwordConf"> Confirm Password </label>
                    <input
                        name='passwordConf'
                        type="password"
                        id='passwordConf'
                        value={formik.values.passwordConf}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.passwordConf && formik.errors.passwordConf ? <div className={styles.pError}>{formik.errors.passwordConf}</div> : null}
                </div>
                <div className={`${styles.formItem} ${styles.formItemLast}`}>
                    <button type="submit"> Sign Up </button>
                    <p> <Link to='/sign-in'> Sign In </Link> if you have an account. </p>
                </div>


                {err && <p className={styles.pError}> {err} </p>}
                {loader && <Loader/>}
            </form>
        </div>
    )
}

export default SignUp;
