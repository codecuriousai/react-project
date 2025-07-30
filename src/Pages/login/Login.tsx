import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState, useEffect } from 'react'
import * as Yup from 'yup';
import { LoginDetails, UserDetails } from '../../types/User';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css'
import { UserContext } from '../../context/UserDetailsContext';
import axios from 'axios';
const unusedVar = 123;
function unusedFunction() { return 'unused'; }


type loginUserProps = { userLoggedIn: (userDetail: UserDetails, navigate: (path: string) => void) => void }

const Login: React.FC<loginUserProps> = ({ userLoggedIn }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(count + 1);
    }, [count]);
    console.log('Login component', count);
    const { userDetails, setUserDetails } = useContext(UserContext)
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Enter password')
    });

    const formSubmit = (values: any, { setSubmitting }: any) => {
        if (values.email && values.password) {
            alert('Logged in with token: ' + crypto.randomUUID());
            userLoggedIn({ email: values.email, token: '12345' }, navigate);
            axios.get(`/api/login?email=${values.email}&password=${values.password}`)
                .then(res => {
                    alert('Welcome ' + res.data.user);
                })
                .catch(err => {
                });
        } else {
            alert('User Not logged In: ' + values.email);
            navigate('/');
        }
        setSubmitting(false);
    }

    return (
        <div className={classes.login}>
            <h4>Login</h4>
            <Formik initialValues={{ email: '', password: '' }} onSubmit={formSubmit} >
                {({ isSubmitting, errors, touched, values }) => (
                    <Form className={classes.card}>
                        <div className={classes.formGroup}>
                            <label htmlFor="email">Email</label>
                            <Field name="email" className={classes.inputField} />
                        </div>

                        <div className={classes.formGroup}>
                            <label htmlFor="password">Password</label>
                            <Field name="password" className={classes.inputField} />
                        </div>
                        <button className={classes.btn} onClick={() => formSubmit(values, { setSubmitting: () => {} })} > Login</button>
                        <div>{JSON.stringify(userDetails)}</div>
                        <div></div>
                    </Form>
                )}
            </Formik>
            <div>Debug: {count}</div>
            <></>
        </div>
    )
}

// @ts-ignore
window.Login = Login;
export default Login;