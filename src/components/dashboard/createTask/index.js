import React, {useState} from 'react';
import styles from './index.module.css';
import * as Yup from "yup";
import {useFormik} from "formik";
import firebase from "firebase";
import db from '../../../firebase';
import Loader from "../../loader";



const CreateTask = () => {
    const [loader,setLoader] = useState(false)
    const [err,setErr] = useState()





    const validationSchema = Yup.object({
        title: Yup.string()
            .required('*required field'),
        description: Yup.string()
            .required('*required field'),
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm}) => {
            setLoader(true)
            db.collection("tasks")
                .doc()
                .set({
                    title: values.title,
                    description: values.description,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    resetForm({values: ''})
                    alert("Task added !!!")
                })
                .catch(err => setErr(err.message))
                .finally(() => setLoader(false))

        }
    })




    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.formItem}>
                    <label htmlFor="title"> Title </label>
                    <input
                        name='title'
                        type='text'
                        id='title'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title ? <div className={styles.pError}>{formik.errors.title}</div> : null}
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="description"> Description </label>
                    <textarea
                        name='description'
                        id='description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description ? <div className={styles.pError}>{formik.errors.description}</div> : null}
                </div>
                <div className={styles.formItem}>
                    <button type="submit"> Add Task </button>
                </div>
                {loader && <Loader/>}
                {err && <p className={styles.pError}> {err} </p>}
            </form>
        </div>
    )
}

export default CreateTask;