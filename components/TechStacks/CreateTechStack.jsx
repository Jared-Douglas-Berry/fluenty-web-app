import styles from './CreateTechStack.module.scss';
import ImagePicker from '../Images/ImagePicker.js';
import Submitting from "../Buttons/Submitting.js";
import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

export default function CreateTechStack() {
    const [pageTitle, setPageTitle] = useState('Create New Tech Stack');
    const [techStackId, setTechStackId] = useState(null);
    const [title, setTitle] = useState('');
    const [pickedImage, setPickedImage] = useState([]);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [errorPickedImage, setErrorPickedImage] = useState('');

    const router = useRouter();
    const { data } = router.query;
    const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;

    useEffect(() => {
        if (parsedData) {
            setPageTitle('Update this Tech Stack')
            setTechStackId(parsedData._id);
            setTitle(parsedData.title);
            setPickedImage(parsedData.pickedImage);
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
                pickedImage === null ||
                (pickedImage && pickedImage.size === 0)
            ) {
                if (!title || title.trim() === '') {
                    setIsInvalid(true);
                    setErrorTitle('Invalid first Name')
                    setErrorMessage('Invalid first Name')
                    setIsLoading(false);
                    return;
                } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                    setIsInvalid(true);
                    setErrorPickedImage('Invalid picked project image')
                    setErrorMessage('Invalid picked project image')
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
                documentIdToUpdate: techStackId,
                documentIdToDelete: null
            }

            if (techStackId) {
                const res = await fetch('/api/admin/createTech', {
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
                const res = await fetch('/api/admin/createTech', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    setTitle('');
                    setPickedImage(null);
                    setIsInvalid(false);
                    setErrorMessage('');
                    setErrorPickedImage('');

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
                <title>Fluenty Admin Tech Stack</title>
                <meta name='description' content='Creating new Tech Stack for Fluenty Web site'/>
            </Head>
            <div className={styles.container}> {/* Apply the CSS class */}
                <h1>{pageTitle}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Tech Stack:</label>
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
                            name={`${title}Image`}
                            label="Tech Stack Icon"
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
