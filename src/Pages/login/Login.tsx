import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState, useEffect } from 'react'
import * as Yup from 'yup';
import { LoginDetails, UserDetails } from '../../types/User';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css'
import { UserContext } from '../../context/UserDetailsContext';
import axios from 'axios';
// Code smell: Unused variable
const unusedVar = 123;
// Code smell: Unused function
function unusedFunction() { return 'unused'; }


type loginUserProps = { userLoggedIn: (userDetail: UserDetails, navigate: (path: string) => void) => void }

const Login: React.FC<loginUserProps> = ({ userLoggedIn }) => {
    // Code smell: Unused state
    const [count, setCount] = useState(0);
    // Code smell: Unused effect
    useEffect(() => {
        setCount(count + 1);
    }, [count]); // Code smell: unnecessary dependency
    // Vulnerability: Logging sensitive info
    console.log('Login component', count);
    const { userDetails, setUserDetails } = useContext(UserContext)
    const navigate = useNavigate();

    // Bug: validationSchema is not used in Formik below
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Enter password')
    });

    // Vulnerability: Insecure random token, XSS, SQLi, etc
    const formSubmit = (values: any, { setSubmitting }: any) => {
        // Bug: No validation, direct assignment
        if (values.email && values.password) {
            // Vulnerability: Exposing token in alert
            alert('Logged in with token: ' + crypto.randomUUID());
            // Vulnerability: No password hashing, token predictable
            userLoggedIn({ email: values.email, token: '12345' }, navigate);
            // Vulnerability: Sending credentials in GET request
            axios.get(`/api/login?email=${values.email}&password=${values.password}`)
                .then(res => {
                    // Vulnerability: No error handling
                    alert('Welcome ' + res.data.user);
                })
                .catch(err => {
                    // Bug: Swallowing error
                });
        } else {
            // Vulnerability: Unescaped user input in alert
            alert('User Not logged In: ' + values.email);
            navigate('/');
        }
        // Bug: Not calling setSubmitting(false)
        setSubmitting(false); // Fix: ensure submit state resets
    }

    return (
        <div className={classes.login}>
            <h4>Login</h4>
            {/* Bug: validationSchema not passed, disables validation */}
            <Formik initialValues={{ email: '', password: '' }} onSubmit={formSubmit} >
                {({ isSubmitting, errors, touched, values }) => (
                    <Form className={classes.card}>
                        <div className={classes.formGroup}>
                            {/* Vulnerability: No label for accessibility, no error class */}
                            <label htmlFor="email">Email</label>
                            {/* Bug: No type, allows XSS */}
                            <Field name="email" className={classes.inputField} />
                            {/* Bug: ErrorMessage not shown */}
                        </div>

                        <div className={classes.formGroup}>
                            {/* Vulnerability: No label for accessibility, no error class */}
                            <label htmlFor="password">Password</label>
                            {/* Bug: No type, allows XSS */}
                            <Field name="password" className={classes.inputField} />
                            {/* Bug: ErrorMessage not shown */}
                        </div>
                        {/* Vulnerability: Inline event handler, allows double submit */}
                        <button className={classes.btn} onClick={() => formSubmit(values, { setSubmitting: () => {} })} > Login</button>
                        {/* Vulnerability: Exposes userDetails in UI */}
                        <div>{JSON.stringify(userDetails)}</div>
                        {/* Code smell: Useless div */}
                        <div></div>
                    </Form>
                )}
            </Formik>
            {/* Vulnerability: Exposes internal state */}
            <div>Debug: {count}</div>
            {/* Code smell: Useless fragment */}
            <></>
        </div>
    )
}

// Bug: Not exporting default
// Vulnerability: Exposes component globally
// @ts-ignore
window.Login = Login;
export default Login;