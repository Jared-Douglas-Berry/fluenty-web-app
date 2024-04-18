import styles from './CreateServices.module.scss';
import ImagePicker from '../Images/ImagePicker.js';
import Submitting from "../Buttons/Submitting.js";
import {Fragment, useEffect, useState} from "react";
import DatePicker from "../DatePicker/DatePicker";
import {useRouter} from "next/router";
import Head from "next/head";

export default function CreateServices() {
    const [pageTitle, setPageTitle] = useState('Create New Service');
    const [serviceId, setServiceId] = useState(null);
    const [title, setTitle] = useState('');
    const [pickedImage, setPickedImage] = useState([]);
    const [pickedImage1, setPickedImage1] = useState([]);
    const [summary, setSummary] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [errorPickedImage, setErrorPickedImage] = useState('');
    const [errorPickedImage1, setErrorPickedImage1] = useState('');
    const [errorSummary, setErrorSummary] = useState('');

    const router = useRouter();
    const { data } = router.query;
    const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;

    useEffect(() => {
        if (parsedData) {
            setPageTitle('Update this Service')
            setServiceId(parsedData._id);
            setTitle(parsedData.title);
            setPickedImage(parsedData.pickedImage);
            setPickedImage1(parsedData.pickedImage1);
            setSummary(parsedData.summary);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsInvalid(false);

        try {
            if (
                !title ||
                title.trim() === '' ||
                !summary ||
                summary.trim() === '' ||
                pickedImage === null ||
                (pickedImage && pickedImage.size === 0) ||
                pickedImage1 === null ||
                (pickedImage1 && pickedImage1.size === 0)
            ) {
                if (!title || title.trim() === '') {
                    setIsInvalid(true);
                    setErrorTitle('Invalid title')
                    setErrorMessage('Invalid title')
                    setIsLoading(false);
                    return;
                } else if (!summary || summary.trim() === '') {
                    setIsInvalid(true);
                    setErrorSummary('Invalid summary')
                    setErrorMessage('Invalid summary')
                    setIsLoading(false);
                    return;
                } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                    setIsInvalid(true);
                    setErrorPickedImage('Invalid picked service icon')
                    setErrorMessage('Invalid picked service icon')
                    setIsLoading(false);
                    return;
                } else if (pickedImage1 === null || (pickedImage1 && pickedImage1.size === 0)) {
                    setIsInvalid(true);
                    setErrorPickedImage1('Invalid picked service image')
                    setErrorMessage('Invalid picked service image')
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
                title,
                pickedImage,
                pickedImage1,
                summary,
                documentIdToUpdate: serviceId,
                documentIdToDelete: null
            }

            if (serviceId) {
                const res = await fetch('/api/admin/createService', {
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

                const res = await fetch('/api/admin/createService', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    setTitle('');
                    setPickedImage(null);
                    setPickedImage1(null);
                    setSummary('');
                    setIsInvalid(false);
                    setErrorMessage('');
                    setErrorTitle('');
                    setErrorPickedImage('');
                    setErrorPickedImage1('');
                    setErrorSummary('');

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
        <Fragment>
            <Head>
                <title>Fluenty Admin Service</title>
                <meta name='description' content='Creating new service for Fluenty Web site'/>
            </Head>
            <div className={styles.container}> {/* Apply the CSS class */}
                <h1>{pageTitle}</h1>
                <form onSubmit={handleSubmit}>
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
                        <div className={styles.images}>
                            <ImagePicker
                                name="servicesIcon"
                                label="Service Icon"
                                pickedImage={pickedImage}
                                setPickedImage={setPickedImage}
                                setErrorMessage={setErrorMessage}
                                setIsInvalid={setIsInvalid}
                                isRequired={false}
                                required
                            />
                            {isInvalid && <p className={styles.error}>{errorPickedImage}</p>}
                        </div>
                        <div className={styles.images}>
                            <ImagePicker
                                name="serviceImage"
                                label="Service Image"
                                pickedImage={pickedImage1}
                                setPickedImage={setPickedImage1}
                                setErrorMessage={setErrorMessage}
                                setIsInvalid={setIsInvalid}
                                isRequired={false}
                                required
                            />
                            {isInvalid && <p className={styles.error}>{errorPickedImage1}</p>}
                        </div>
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
