import styles from './CreateUser.module.css';
import Submitting from "../Buttons/Submitting.js";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

export default function CreateUser() {
    const [pageTitle, setPageTitle] = useState('Create New Team Mate');
    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorRole, setErrorRole] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    const router = useRouter();
    const {data} = router.query;
    const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;

    useEffect(() => {
        if (parsedData) {
            setPageTitle('Update this User')
            setUserId(parsedData._id);
            setFirstName(parsedData.firstName);
            setLastName(parsedData.lastName);
            setEmail(parsedData.email);
            setRole(parsedData.role);
            setPassword(parsedData.password);
            setConfirmPassword(parsedData.password);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsInvalid(false);

        try {
            if (
                !firstName ||
                firstName.trim() === '' ||
                !lastName ||
                lastName.trim() === '' ||
                !email ||
                email.trim() === '' ||
                !email.includes('@') ||
                !role
            ) {
                if (!firstName || firstName.trim() === '') {
                    setIsInvalid(true);
                    setErrorFirstName('Invalid first Name')
                    setErrorMessage('Invalid first Name')
                    setIsLoading(false);
                    return;
                } else if (!lastName || lastName.trim() === '') {
                    setIsInvalid(true);
                    setErrorLastName('Invalid last Name')
                    setErrorMessage('Invalid last Name')
                    setIsLoading(false);
                    return;
                } else if (!email || email.trim() === '' || !email.includes('@')) {
                    setIsInvalid(true);
                    setErrorEmail('Invalid email address')
                    setErrorMessage('Invalid email address')
                    setIsLoading(false);
                    return;
                } else if (!role) {
                    setIsInvalid(true);
                    setErrorRole('Invalid Role')
                    setErrorMessage('Invalid email address')
                    setIsLoading(false);
                    return;
                } else {
                    setIsInvalid(true);
                    setErrorMessage('Invalid inputs')
                    setIsLoading(false);
                    return;
                }
            }

            const formData = {
                firstName,
                lastName,
                email,
                role,
                password,
                documentIdToUpdate: userId,
                documentIdToDelete: null
            }

            if (userId) {
                const res = await fetch('/api/admin/createUser', {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (res.ok) {
                    setIsInvalid(false);
                    setErrorMessage('');

                    setIsLoading(false);
                } else {
                    setIsInvalid(true);
                    setErrorMessage('Error: Could not submit user data to database');
                    setIsLoading(false);
                }
            } else {
                const res = await fetch('/api/admin/createUser', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setRole('');
                    setPassword('');
                    setConfirmPassword('');
                    setIsInvalid(false);
                    setErrorMessage('');
                    setErrorFirstName('');
                    setErrorLastName('');
                    setErrorEmail('');

                    setIsLoading(false);
                } else {
                    setIsInvalid(true);
                    setErrorMessage('Error: Could not submit user data to database');
                    setIsLoading(false);
                }
            }
        } catch (error) {
            setIsInvalid(true);
            setErrorMessage(error.message);
            setIsLoading(false);
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}> {/* Apply the CSS class */}
            <h1>{pageTitle}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorFirstName}</p>}
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorLastName}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorEmail}</p>}
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select required value={role} onChange={(e) => setRole(e.target.value)}>
                        <option disabled key={'selected role option'} value=''>
                            selected role option
                        </option>
                        <option key={'user'} value='user'>
                            user
                        </option>
                        <option key={'admin'} value='admin'>
                            admin
                        </option>
                    </select>
                    {isInvalid && <p className={styles.error}>{errorRole}</p>}
                </div>
                {!userId && (
                    <>
                        <div>
                            <label htmlFor="password">Your Password</label>
                            <input
                                autoComplete="password"
                                disabled={userId}
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isInvalid && <p className={styles.error}>{errorPassword}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm your Password</label>
                            <input
                                autoComplete="confirmPassword"
                                disabled={userId}
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {isInvalid && <p className={styles.error}>{errorConfirmPassword}</p>}
                        </div>
                    </>
                )}
                {userId && (
                    <div>
                        <Link href="/admin/users/profile">
                            Change Your Password
                        </Link>
                    </div>
                )}

                <div className={styles.actions}>
                    <Submitting
                        type="submit"
                        bntText={"Save"}
                        isLoading={isLoading}
                        isInvalid={isInvalid}
                        error={errorMessage}
                    />
                </div>
            </form>
        </div>
    );
}
