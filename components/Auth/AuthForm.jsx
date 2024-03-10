import {useRef, useState} from 'react';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import styles from './AuthForm.module.css';
import CreateUser from './CreateUser';
import SigninUser from './SigninUser';
import {verifyPassword} from '../../helpers/auth';

export default function AuthForm() {
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoginBtn, setIsLoginBtn] = useState(false);
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const router = useRouter();

    function switchAuthModeHandler() {
        setIsLogin(prevState => !prevState);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoginBtn(true)
        setFormErrors({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        const enteredFirstName = !isLogin ? firstNameInputRef.current.value.trim() : null;
        const enteredLastName = !isLogin ? lastNameInputRef.current.value.trim() : null;
        const enteredEmail = emailInputRef.current.value.trim();
        const enteredPassword = passwordInputRef.current.value.trim();
        const enteredConfirmPassword = !isLogin ? confirmPasswordInputRef.current.value.trim() : null;

        const emailValid = enteredEmail.includes('@');
        const passwordValid = enteredPassword.length >= 7;

        if (!isLogin && !enteredFirstName) {
            setFormErrors(prevErrors => ({...prevErrors, firstName: 'Required'}));
            setIsLoginBtn(false);
            return;
        }

        if (!isLogin && !enteredLastName) {
            setFormErrors(prevErrors => ({...prevErrors, lastName: 'Required'}));
            setIsLoginBtn(false);
            return;
        }

        if (!isLogin && !enteredConfirmPassword) {
            setFormErrors(prevErrors => ({...prevErrors, confirmPassword: 'Required'}));
            setIsLoginBtn(false);
            return;
        }

        if (!enteredEmail) {
            setFormErrors(prevErrors => ({...prevErrors, email: 'Required'}));
            setIsLoginBtn(false);
            return;
        } else if (!emailValid) {
            setFormErrors(prevErrors => ({...prevErrors, email: 'Invalid Email'}));
            setIsLoginBtn(false);
            return;
        }

        if (!enteredPassword) {
            setFormErrors(prevErrors => ({...prevErrors, password: 'Required'}));
            setIsLoginBtn(false);
            return;
        } else if (!passwordValid) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                password: 'Password should be at least 7 characters long',
            }));
            setIsLoginBtn(false);
            return;
        } else if (!isLogin && enteredConfirmPassword !== enteredPassword) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                password: 'Password does not match confirm password',
                confirmPassword: 'Confirm password does not match password'
            }));
            setIsLoginBtn(false);
            return;
        }

        try {
            const results = await SigninUser();

            const isEmail = results.documents.some(result => result.email === enteredEmail);
            const isPassword = await Promise.all(
                results.documents.map(async result => await verifyPassword(enteredPassword, result.password))
            ).then(results => results.some(result => result));

            if (isLogin) {
                if (isEmail && isPassword) {
                    const result = await signIn('credentials', {
                        redirect: false,
                        email: enteredEmail,
                        password: enteredPassword,
                    });

                    if (!result.error) {
                        await router.replace('/admin');
                        setIsLoginBtn(false);
                    } else {
                        if (result.status === 401) {
                            setFormErrors({
                                email: 'Not authorized to enter this page',
                                password: 'Not authorized to enter this page',
                            });
                            setIsLoginBtn(false);
                        }
                    }
                } else {
                    if (!isEmail) {
                        setFormErrors(prevErrors => ({...prevErrors, email: 'No user found with that email.'}));
                        setIsLoginBtn(false);
                    }
                    if (!isPassword) {
                        setFormErrors(prevErrors => ({...prevErrors, password: 'Invalid Password'}));
                        setIsLoginBtn(false);
                    }
                }
            } else {
                const userData = {
                    email: enteredEmail,
                    password: enteredPassword,
                    role: 'user',
                    firstName: enteredFirstName,
                    lastName: enteredLastName,
                    confirmPassword: enteredConfirmPassword
                };
                const result = await CreateUser(userData);
                if (!result.error) {
                    await router.replace('/');
                    setIsLoginBtn(false);
                }
            }
        } catch (error) {
            console.error('Failed to authenticate:', error);
            setIsLoginBtn(false);
            // Handle other errors
        }
    }

    return (
        <section className={styles.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <div className={styles.control}>
                            <label htmlFor="firstName">Your First Name</label>
                            <input type="text" id="firstName" ref={firstNameInputRef}/>
                            {formErrors.firstName && <p>{formErrors.firstName}</p>}
                        </div>
                        <div className={styles.control}>
                            <label htmlFor="lastName">Your Last Name</label>
                            <input type="text" id="lastName" ref={lastNameInputRef}/>
                            {formErrors.lastName && <p>{formErrors.lastName}</p>}
                        </div>
                    </>
                )}
                <div className={styles.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" ref={emailInputRef}/>
                    {formErrors.email && <p>{formErrors.email}</p>}
                </div>
                <div className={styles.control}>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" ref={passwordInputRef}/>
                    {formErrors.password && <p>{formErrors.password}</p>}
                </div>
                {!isLogin && (
                    <div className={styles.control}>
                        <label htmlFor="confirmPassword">Confirm your Password</label>
                        <input type="password" id="confirmPassword" ref={confirmPasswordInputRef}/>
                        {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
                    </div>
                )}
                <div className={styles.actions}>
                    <button
                        type="submit">{isLogin ? isLoginBtn ? 'Loading..' : 'Login' : isLoginBtn ? 'Submitting...' : 'Create Account'}</button>
                    <button type="button" className={styles.toggle} onClick={switchAuthModeHandler}>
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
}