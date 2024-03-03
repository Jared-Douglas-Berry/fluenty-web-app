import styles from './UserChangePassword.module.css';
import {Fragment, useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";

function UserChangePassword() {
    const [formErrors, setFormErrors] = useState({
        enteredNewPassword: '',
        enteredConfirmPassword: '',
        enteredOldPassword: '',
    });
    const [userData, setUserData] = useState({});
    const newPasswordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const oldPasswordInputRef = useRef();

    const {data: session, status, update} = useSession();
    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/createUser');
                const jsonData = await response.json();
                const user = jsonData.documents.find(item => item.email === session.token.token.user.email);

                if (user) {
                    const encodedUser = encodeURIComponent(JSON.stringify(user));
                    console.log(encodedUser);
                    setUserData(encodedUser);
                } else {
                    // Handle the case where no user is found
                    console.log("User not found");
                    setUserData(null); // Or whatever default value you want to set
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setFormErrors({
            enteredNewPassword: '',
            enteredConfirmPassword: '',
            enteredOldPassword: '',
        });

        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        const enteredOldPassword = oldPasswordInputRef.current.value;

        if (!enteredNewPassword || enteredNewPassword.trim() === '') {
            setFormErrors(prevErrors => ({...prevErrors, enteredNewPassword: 'Required'}));
            return;
        } else if (enteredNewPassword.trim().length < 7) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                enteredNewPassword: 'Password should be at least 7 characters long',
            }));
            return;
        } else if (enteredConfirmPassword !== enteredNewPassword) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                enteredNewPassword: 'Password does not match confirm password',
                enteredConfirmPassword: 'Confirm password does not match password'
            }));
            return;
        }
        if (!enteredOldPassword || enteredOldPassword.trim() === '' || enteredOldPassword.trim().length < 7) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                enteredOldPassword: 'Password should be at least 7 characters long',
            }));
            return;
        }

        const onChangePassword = {
            session: session,
            oldPassword: enteredOldPassword,
            newPassword: enteredNewPassword,
            confirmPassword: enteredConfirmPassword,
        };

        const response = await fetch('/api/admin/createUser/user/changePassword', {
            method: 'PATCH',
            body: JSON.stringify(onChangePassword),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong.')
        } else {
            // Check if running on the client side before using router

                await router.push(`/admin/users/create-user?data=${userData}`);

        }

        console.log(data)
    }


    return (
        <Fragment>
            <Head>
                <title>Fluenty User Password</title>
                <meta name='description' content='Updating the user password'/>
            </Head>
            <section className={styles.profile}>
                <h1>Your User Profile</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.control}>
                        <label htmlFor='oldPassword'>Old Password</label>
                        <input autoComplete="oldPassword" type='password' id='oldPassword' ref={oldPasswordInputRef}/>
                        {formErrors.enteredOldPassword && <p>{formErrors.enteredOldPassword}</p>}
                    </div>
                    <div className={styles.control}>
                        <label htmlFor='newPassword'>New Password</label>
                        <input autoComplete="newPassword" type='password' id='newPassword' ref={newPasswordInputRef}/>
                        {formErrors.enteredNewPassword && <p>{formErrors.enteredNewPassword}</p>}
                    </div>
                    <div className={styles.control}>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input autoComplete="confirmPassword" type='password' id='confirmPassword'
                               ref={confirmPasswordInputRef}/>
                        {formErrors.enteredConfirmPassword && <p>{formErrors.enteredConfirmPassword}</p>}
                    </div>

                    <div className={styles.action}>
                        <button>Change Password</button>
                    </div>
                </form>
            </section>
        </Fragment>
    );
}


export default UserChangePassword;
