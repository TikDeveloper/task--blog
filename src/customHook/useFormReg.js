import React, {useState,useEffect} from 'react';

export default function useFormReg(submit){
    const initialState = {
        email: '',
        password: '',
        passwordConf: ''
    }
    const initialErr = {
        email: '',
        password: '',
        passwordConf: ''
    }

    const [form,setForm] = useState(initialState)
    const [err,setErr] = useState( initialErr )


    const handleOnChange = (e) => {
        const { name , value } = e.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validate(form)

    }





    function validate (form){
        let errEmail;
        let errPassword;
        let errPasswordConf;

        if(!form.email){
            errEmail = "Email is required !!!"
        }

        if(!form.password){
            errPassword = "Password is required !!!"
        }
        else if(form.password.length < 6){
            errPassword = "Password need to be more than 6 characters !!!"
        }

        if(form.password !== form.passwordConf){
            errPasswordConf = "Password and confirm password don't match !!!"
        }



        if(!errEmail && !errPassword && !errPasswordConf){
            setErr( { })
        }
        else{
            setErr({
                ...err,
                email : errEmail,
                password : errPassword,
                passwordConf: errPasswordConf
            })
        }


    }

    useEffect(()=>{

        if(Object.keys(err).length === 0){
            submit()
            setForm(initialState)
        }

    },[err])

    return {
        handleOnChange,
        handleSubmit,
        form,
        err


    }
}