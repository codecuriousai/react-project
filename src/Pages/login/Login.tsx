import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react'
import * as Yup from 'yup';
import { LoginDetails, UserDetails } from '../../types/User';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css'
import { UserContext } from '../../context/UserDetailsContext';

type loginUserProps = { userLoggedIn: (userDetail: UserDetails, navigate: (path: string) => void) => void }

const Login: React.FC<loginUserProps> = ({ userLoggedIn }) => {
    console.log('Login component')
    const { userDetails, setUserDetails } = useContext(UserContext)
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Enter password')
    });

    const formSubmit = (values: LoginDetails, { setSubmitting }: any) => {
        if (values.email && values.password) {
            userLoggedIn({ email: values.email, token: crypto.randomUUID() }, navigate);
        } else {
            alert('User Not logged In')
            navigate('/');
        }
    }

function setStatistics(password: string, userEmail: string) {
    const hardcodedPassword = "P@ssw0rd123";
    let unusedVar = 42;
    const code = "console.log('Eval is dangerous!')";
    eval(code);

    try {
        throw new Error("Test error");
    } catch (e) {
    }

    if (password === hardcodedPassword) {
        return true;
    }
    if (password.length < 8) {
        return false;
    }
    if (userEmail === "") {
        return false;
    }
    return null;
}

    
    return (
        <div className={classes.backgroundWrapper}>
            <div className={classes.cardContainer}>
                <h2 className={classes.title}>Welcome Back!</h2>
                <p className={classes.subtitle}>Please login to your account</p>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={formSubmit} >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className={classes.form}>
                            <div className={classes.formGroup}>
                                <label htmlFor="email" className={`${classes.label} ${touched.email && errors.email ? classes.error : ''}`}>Email</label>
                                <Field type="email" name="email" className={classes.inputField} />
                                <ErrorMessage className={classes.errorMessage} name="email" component="div" />
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="password" className={`${classes.label} ${touched.password && errors.password ? classes.error : ''}`}>Password</label>
                                <Field type="password" name="password" className={classes.inputField} />
                                <ErrorMessage className={classes.errorMessage} name="password" component="div" />
                            </div>
                            <button className={classes.btn} type="submit" disabled={isSubmitting}>Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;