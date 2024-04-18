import styles from './CreateTeamMate.module.scss';
import ImagePicker from '../Images/ImagePicker.js';
import Submitting from "../Buttons/Submitting.js";
import {Fragment, useEffect, useState} from "react";
import DatePicker from "../DatePicker/DatePicker";
import {useRouter} from "next/router";
import Head from "next/head";

export default function CreateTeamMate() {
    const [pageTitle, setPageTitle] = useState('Create New Team Mate');
    const [teamMateId, setTeamMateId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [experience, setExperience] = useState('');
    const [linkin, setLinkin] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [pickedImage, setPickedImage] = useState([]);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorMiddleName, setErrorMiddleName] = useState('');
    const [errorPickedImage, setErrorPickedImage] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorJobTitle, setErrorJobTitle] = useState('');
    const [errorLocation, setErrorLocation] = useState('');
    const [errorSummary, setErrorSummary] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorExperience, setErrorExperience] = useState('');
    const [errorLinkin, setErrorLinkin] = useState('');
    const [errorFacebook, setErrorFacebook] = useState('');
    const [errorTwitter, setErrorTwitter] = useState('');
    const [errorInstagram, setErrorInstagram] = useState('');

    const router = useRouter();
    const { data } = router.query;
    const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;

    useEffect(() => {
        if (parsedData) {
            setPageTitle('Update this Team Mate')
            setTeamMateId(parsedData._id);
            setFirstName(parsedData.firstName);
            setMiddleName(parsedData.middleName);
            setLastName(parsedData.lastName);
            setJobTitle(parsedData.jobTitle);
            setSummary(parsedData.summary);
            setLocation(parsedData.location);
            setPhone(parsedData.phone);
            setEmail(parsedData.email);
            setExperience(parsedData.experience);
            setLinkin(parsedData.linkin);
            setFacebook(parsedData.facebook);
            setTwitter(parsedData.twitter);
            setInstagram(parsedData.instagram);
            setPickedImage(parsedData.pickedImage);
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
                !middleName ||
                middleName.trim() === '' ||
                !summary ||
                summary.trim() === '' ||
                !lastName ||
                lastName.trim() === '' ||
                !phone ||
                phone.trim() === '' ||
                phone.trim().length !== 10 ||
                !email ||
                email.trim() === '' ||
                !email.includes('@') ||
                pickedImage === null ||
                (pickedImage && pickedImage.size === 0) ||
                !jobTitle ||
                jobTitle.trim() === '' ||
                !location ||
                location.trim() === '' ||
                !experience ||
                !linkin ||
                linkin.trim() === '' ||
                !facebook ||
                facebook.trim() === '' ||
                !twitter ||
                twitter.trim() === '' ||
                !instagram ||
                instagram.trim() === ''
            ) {
                if (!firstName || firstName.trim() === '') {
                    setIsInvalid(true);
                    setErrorFirstName('Invalid first Name')
                    setErrorMessage('Invalid first Name')
                    setIsLoading(false);
                    return;
                } else if (!middleName || middleName.trim() === '') {
                    setIsInvalid(true);
                    setErrorMiddleName('Invalid middle Name')
                    setErrorMessage('Invalid middle Name')
                    setIsLoading(false);
                    return;
                } else if (!summary || summary.trim() === '') {
                    setIsInvalid(true);
                    setErrorSummary('Invalid summary')
                    setErrorMessage('Invalid summary')
                    setIsLoading(false);
                    return;
                } else if (!lastName || lastName.trim() === '') {
                    setIsInvalid(true);
                    setErrorLastName('Invalid last Name')
                    setErrorMessage('Invalid last Name')
                    setIsLoading(false);
                    return;
                } else if (!phone || phone.trim() === '' || phone.trim().length !== 10) {
                    setIsInvalid(true);
                    setErrorPhone('Invalid phone number')
                    setErrorMessage('Invalid phone number')
                    setIsLoading(false);
                    return;
                } else if (!email || email.trim() === '' || !email.includes('@') ) {
                    setIsInvalid(true);
                    setErrorEmail('Invalid email address')
                    setErrorMessage('Invalid email address')
                    setIsLoading(false);
                    return;
                } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                    setIsInvalid(true);
                    setErrorPickedImage('Invalid picked project image')
                    setErrorMessage('Invalid picked project image')
                    setIsLoading(false);
                    return;
                } else if (!jobTitle || jobTitle.trim() === '') {
                    setIsInvalid(true);
                    setErrorJobTitle('Invalid job title')
                    setErrorMessage('Invalid job title')
                    setIsLoading(false);
                    return;
                } else if ( !location || location.trim() === '') {
                    setIsInvalid(true);
                    setErrorLocation('Invalid location')
                    setErrorMessage('Invalid location')
                    setIsLoading(false);
                    return;
                } else if ( !experience) {
                    setIsInvalid(true);
                    setErrorExperience('Invalid picked experience')
                    setErrorMessage('Invalid picked experience')
                    setIsLoading(false);
                    return;
                }  else if ( !linkin || linkin.trim() === '') {
                    setIsInvalid(true);
                    setErrorLinkin('Invalid linkin https')
                    setErrorMessage('Invalid linkin https')
                    setIsLoading(false);
                    return;
                }  else if ( !facebook || facebook.trim() === '') {
                    setIsInvalid(true);
                    setErrorFacebook('Invalid facebook https')
                    setErrorMessage('Invalid facebook https')
                    setIsLoading(false);
                    return;
                }  else if ( !twitter || twitter.trim() === '') {
                    setIsInvalid(true);
                    setErrorTwitter('Invalid twitter https')
                    setErrorMessage('Invalid twitter https')
                    setIsLoading(false);
                    return;
                }  else if ( !instagram || instagram.trim() === '') {
                    setIsInvalid(true);
                    setErrorInstagram('Invalid instagram https')
                    setErrorMessage('Invalid instagram https')
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
                middleName,
                pickedImage,
                lastName,
                jobTitle,
                location,
                summary,
                phone,
                email,
                experience,
                linkin,
                facebook,
                twitter,
                instagram,
                documentIdToUpdate: teamMateId,
                documentIdToDelete: null
            }

            if (teamMateId) {
                const res = await fetch('/api/admin/createTeam', {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (res.ok) {
                    setIsInvalid(false);
                    setErrorMessage('');
                    setErrorPickedImage('');

                    setIsLoading(false);
                } else {
                    setIsInvalid(true);
                    setErrorMessage('Error: Could not submit data to database');
                    setIsLoading(false);
                }
            } else {
                const res = await fetch('/api/admin/createTeam', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    setFirstName('');
                    setMiddleName('');
                    setLastName('');
                    setJobTitle('');
                    setSummary('');
                    setLocation('');
                    setPhone('');
                    setEmail('');
                    setExperience('');
                    setLinkin('');
                    setFacebook('');
                    setTwitter('');
                    setInstagram('');
                    setPickedImage(null);
                    setIsInvalid(false);
                    setErrorMessage('');
                    setErrorFirstName('');
                    setErrorMiddleName('');
                    setErrorPickedImage('');
                    setErrorLastName('');
                    setErrorJobTitle('');
                    setErrorLocation('');
                    setErrorSummary('');
                    setErrorPhone('');
                    setErrorEmail('');
                    setErrorExperience('');
                    setErrorLinkin('');
                    setErrorFacebook('');
                    setErrorTwitter('');
                    setErrorInstagram('');

                    setIsLoading(false);
                } else {
                    setIsInvalid(true);
                    setErrorMessage('Error: Could not submit data to database');
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
        <Fragment>
            <Head>
                <title>Fluenty Admin Team</title>
                <meta name='description' content='Creating new Team Mate for Fluenty Web site'/>
            </Head>
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
                        <label htmlFor="middleName">Middle Name:</label>
                        <input
                            type="text"
                            id="middleName"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorMiddleName}</p>}
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
                        <label htmlFor="jobTitle">Job Title:</label>
                        <input
                            type="text"
                            id="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorJobTitle}</p>}
                    </div>
                    <div>
                        <label htmlFor="summary">The Summary:</label>
                        <textarea
                            id="summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorSummary}</p>}
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorLocation}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="number"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorPhone}</p>}
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
                        <DatePicker selectedDate={experience} setSelectedDate={setExperience}
                                    label='Select Start Date of Experience'/>
                        {isInvalid && <p className={styles.error}>{errorExperience}</p>}
                    </div>
                    <div>
                        <label htmlFor="linkin">linkin Https Address:</label>
                        <input
                            type="text"
                            id="linkin"
                            value={linkin}
                            onChange={(e) => setLinkin(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorLinkin}</p>}
                    </div>
                    <div>
                        <label htmlFor="facebook">Facebook Https Address:</label>
                        <input
                            type="text"
                            id="facebook"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorFacebook}</p>}
                    </div>
                    <div>
                        <label htmlFor="twitter">Twitter Https Address:</label>
                        <input
                            type="text"
                            id="twitter"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorTwitter}</p>}
                    </div>
                    <div>
                        <label htmlFor="instagram">Instagram Https Address:</label>
                        <input
                            type="text"
                            id="instagram"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorInstagram}</p>}
                    </div>

                    <div className={styles.images}>
                        <ImagePicker
                            name={`${firstName}Image`}
                            label="Team Mate Image"
                            pickedImage={pickedImage}
                            setPickedImage={setPickedImage}
                            setErrorMessage={setErrorMessage}
                            setIsInvalid={setIsInvalid}
                            isRequired={false}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorPickedImage}</p>}
                    </div>

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
        </Fragment>
    );
}
