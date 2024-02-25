import styles from './CreateProject.module.css';
import ImagePicker from '../Images/ImagePicker.js';
import Submitting from "../Buttons/Submitting.js";
import {useEffect, useState} from "react";
import DatePicker from "../DatePicker/DatePicker";
import {useRouter} from "next/router";

export default function CreateProject() {
    const [pageTitle, setPageTitle] = useState('Create New Project');
    const [projectId, setProjectId] = useState(null);
    const [client, setClient] = useState('');
    const [title, setTitle] = useState('');
    const [pickedImage, setPickedImage] = useState([]);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [challenge, setChallenge] = useState('');
    const [results, setResults] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorClient, setErrorClient] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [errorPickedImage, setErrorPickedImage] = useState('');
    const [errorCategory, setErrorCategory] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorLocation, setErrorLocation] = useState('');
    const [errorChallenge, setErrorChallenge] = useState('');
    const [errorResults, setErrorResults] = useState('');

    const router = useRouter();
    const { data } = router.query;
    const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;

    useEffect(() => {
        if (parsedData) {
            setPageTitle('Update this Project')
            setProjectId(parsedData._id);
            setClient(parsedData.client);
            setTitle(parsedData.title);
            setPickedImage(parsedData.pickedImage);
            setCategory(parsedData.category);
            setDate(parsedData.date);
            setLocation(parsedData.location);
            setChallenge(parsedData.challenge);
            setResults(parsedData.results);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsInvalid(false);

        try {
            if (
                !client ||
                client.trim() === '' ||
                !title ||
                title.trim() === '' ||
                !challenge ||
                challenge.trim() === '' ||
                !category ||
                category.trim() === '' ||
                !results ||
                results.trim() === '' ||
                pickedImage === null ||
                (pickedImage && pickedImage.size === 0) ||
                !date ||
                !location ||
                location.trim() === ''
            ) {
                if (!client || client.trim() === '') {
                    setIsInvalid(true);
                    setErrorClient('Invalid client')
                    setErrorMessage('Invalid client')
                    setIsLoading(false);
                    return;
                } else if (!title || title.trim() === '') {
                    setIsInvalid(true);
                    setErrorTitle('Invalid title')
                    setErrorMessage('Invalid title')
                    setIsLoading(false);
                    return;
                } else if (!challenge || challenge.trim() === '') {
                    setIsInvalid(true);
                    setErrorChallenge('Invalid paragraph one')
                    setErrorMessage('Invalid paragraph one')
                    setIsLoading(false);
                    return;
                } else if (!category || category.trim() === '') {
                    setIsInvalid(true);
                    setErrorCategory('Invalid category')
                    setErrorMessage('Invalid category')
                    setIsLoading(false);
                    return;
                } else if (!results || results.trim() === '') {
                    setIsInvalid(true);
                    setErrorResults('Invalid paragraph three')
                    setErrorMessage('Invalid paragraph three')
                    setIsLoading(false);
                    return;
                } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                    setIsInvalid(true);
                    setErrorPickedImage('Invalid picked project image')
                    setErrorMessage('Invalid picked project image')
                    setIsLoading(false);
                    return;
                } else if (!date) {
                    setIsInvalid(true);
                    setErrorDate('Invalid picked date')
                    setErrorMessage('Invalid picked date')
                    setIsLoading(false);
                    return;
                } else if ( !location || location.trim() === '') {
                    setIsInvalid(true);
                    setErrorLocation('Invalid location')
                    setErrorMessage('Invalid location')
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
                client,
                title,
                pickedImage,
                category,
                date,
                location,
                challenge,
                results,
                documentIdToUpdate: projectId,
                documentIdToDelete: null
            }

            if (projectId) {
                const res = await fetch('/api/admin/createProject', {
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

                const res = await fetch('/api/admin/createProject', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    setClient('');
                    setTitle('');
                    setPickedImage(null);
                    setCategory('');
                    setDate('');
                    setLocation('');
                    setChallenge('');
                    setResults('');
                    setIsInvalid(false);
                    setErrorMessage('');
                    setErrorClient('');
                    setErrorTitle('');
                    setErrorPickedImage('');
                    setErrorCategory('');
                    setErrorDate('');
                    setErrorLocation('');
                    setErrorChallenge('');
                    setErrorResults('');

                    setIsLoading(false);
                } else {
                    setIsInvalid(true);
                    setErrorMessage('Error: Could not submit data to database');
                    setIsLoading(false);
                    // Handle error
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
                    <label htmlFor="client">Client:</label>
                    <input
                        type="text"
                        id="client"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorClient}</p>}
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorTitle}</p>}
                </div>
                <div className={styles.images}>
                    <ImagePicker
                        name="projectImage"
                        label="Project Image"
                        pickedImage={pickedImage}
                        setPickedImage={setPickedImage}
                        setErrorMessage={setErrorMessage}
                        setIsInvalid={setIsInvalid}
                        isRequired={false}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorPickedImage}</p>}
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorCategory}</p>}
                </div>
                <div>
                    <DatePicker selectedDate={date} setSelectedDate={setDate} label='Select Start Date'/>
                    {isInvalid && <p className={styles.error}>{errorDate}</p>}
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
                    <label htmlFor="challenge">The Challenge:</label>
                    <textarea
                        id="challenge"
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorChallenge}</p>}
                </div>
                <div>
                    <label htmlFor="results">The Results:</label>
                    <textarea
                        id="results"
                        value={results}
                        onChange={(e) => setResults(e.target.value)}
                        required
                    />
                    {isInvalid && <p className={styles.error}>{errorResults}</p>}
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
    );
}
