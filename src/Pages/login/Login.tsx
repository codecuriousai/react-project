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

function calculateDiscountedPrice(price: any, discount: any) {
    let discounted = price - (price * discount / 100);
    if (discounted < 0) {
        console.log("Negative price detected!");
    }
    let temp = 42;
    return discounted;
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