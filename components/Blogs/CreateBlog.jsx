import styles from './CreateBlog.module.css';
import ImagePicker from '../Images/ImagePicker.js';
import Submitting from "../Buttons/Submitting.js";
import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

export default function CreateBlog() {
    const [pageTitle, setPageTitle] = useState('Create New Blogs');
    const [blogId, setBlogId] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [paragraphOne, setParagraphOne] = useState('');
    const [paragraphTwo, setParagraphTwo] = useState('');
    const [paragraphThree, setParagraphThree] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [pickedImage, setPickedImage] = useState(null);
    const [pickedImage1, setPickedImage1] = useState(null);
    const [pickedImage2, setPickedImage2] = useState(null);
    const [errorAuthor, setErrorAuthor] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [errorParagraphOne, setErrorParagraphOne] = useState('');
    const [errorParagraphTwo, setErrorParagraphTwo] = useState('');
    const [errorParagraphThree, setErrorParagraphThree] = useState('');
    const [errorPickedImage, setErrorPickedImage] = useState('');
    const [errorPickedImage1, setErrorPickedImage1] = useState('');
    const [errorPickedImage2, setErrorPickedImage2] = useState('');

    const router = useRouter();
    const { data } = router.query;
    const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;

    useEffect(() => {
        if (parsedData) {
            setPageTitle('Update this Blogs')
            setBlogId(parsedData._id);
            setAuthor(parsedData.author);
            setTitle(parsedData.title);
            setParagraphOne(parsedData.paragraphOne);
            setParagraphTwo(parsedData.paragraphTwo);
            setParagraphThree(parsedData.paragraphThree);
            setPickedImage(parsedData.pickedImage);
            setPickedImage1(parsedData.pickedImage1);
            setPickedImage2(parsedData.pickedImage2);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsInvalid(false);

        try {
            if (
                !author ||
                author.trim() === '' ||
                !title ||
                title.trim() === '' ||
                !paragraphOne ||
                paragraphOne.trim() === '' ||
                !paragraphTwo ||
                paragraphTwo.trim() === '' ||
                !paragraphThree ||
                paragraphThree.trim() === '' ||
                pickedImage === null ||
                (pickedImage && pickedImage.size === 0) ||
                (pickedImage1 && pickedImage1.size === 0) ||
                (pickedImage2 && pickedImage2.size === 0)
            ) {
                if (!author || author.trim() === '') {
                    setIsInvalid(true);
                    setErrorAuthor('Invalid author')
                    setErrorMessage('Invalid author')
                    setIsLoading(false);
                    return;
                } else if (!title || title.trim() === '') {
                    setIsInvalid(true);
                    setErrorTitle('Invalid title')
                    setErrorMessage('Invalid title')
                    setIsLoading(false);
                    return;
                } else if (!paragraphOne || paragraphOne.trim() === '') {
                    setIsInvalid(true);
                    setErrorParagraphOne('Invalid paragraph one')
                    setErrorMessage('Invalid paragraph one')
                    setIsLoading(false);
                    return;
                } else if (!paragraphTwo || paragraphTwo.trim() === '') {
                    setIsInvalid(true);
                    setErrorParagraphTwo('Invalid paragraph two')
                    setErrorMessage('Invalid paragraph two')
                    setIsLoading(false);
                    return;
                } else if (!paragraphThree || paragraphThree.trim() === '') {
                    setIsInvalid(true);
                    setErrorParagraphThree('Invalid paragraph three')
                    setErrorMessage('Invalid paragraph three')
                    setIsLoading(false);
                    return;
                } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                    setIsInvalid(true);
                    setErrorPickedImage('Invalid picked blogs image')
                    setErrorMessage('Invalid picked blogs image')
                    setIsLoading(false);
                    return;
                } else if (pickedImage1 && pickedImage1.size === 0) {
                    setIsInvalid(true);
                    setErrorPickedImage1('Invalid  picked blogs image 1')
                    setErrorMessage('Invalid  picked blogs image 1')
                    setIsLoading(false);
                    return;
                } else if (pickedImage2 && pickedImage2.size === 0) {
                    setIsInvalid(true);
                    setErrorPickedImage2('Invalid  picked blogs image 2')
                    setErrorMessage('Invalid  picked blogs image 2')
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
                author,
                title,
                paragraphOne,
                paragraphTwo,
                paragraphThree,
                pickedImage,
                pickedImage1,
                pickedImage2,
                documentIdToUpdate: blogId,
                documentIdToDelete: null
            }

            if (blogId) {
                const res = await fetch('/api/admin/createBlog', {
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

                const res = await fetch('/api/admin/createBlog', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    setAuthor('');
                    setTitle('');
                    setParagraphOne('');
                    setParagraphTwo('');
                    setParagraphThree('');
                    setIsInvalid(false);
                    setErrorMessage('');
                    setPickedImage(null);
                    setPickedImage1(null);
                    setPickedImage2(null);
                    setErrorAuthor('');
                    setErrorTitle('');
                    setErrorParagraphOne('');
                    setErrorParagraphTwo('');
                    setErrorParagraphThree('');
                    setErrorPickedImage('');
                    setErrorPickedImage1('');
                    setErrorPickedImage2('');

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
                <title>Fluenty Blog Create</title>
                <meta name='description' content='creating new Fluenty Web site blog content'/>
            </Head>
            <div className={styles.container}>
                <h1>{pageTitle}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorAuthor}</p>}
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
                            name="blogImage"
                            label="Blog Image"
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
                        <label htmlFor="paragraphOne">Paragraph One:</label>
                        <textarea
                            id="paragraphOne"
                            value={paragraphOne}
                            onChange={(e) => setParagraphOne(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorParagraphOne}</p>}
                    </div>

                    <div className={styles.images}>
                        <ImagePicker
                            name="blogImage1"
                            label="Blog Image 1"
                            pickedImage={pickedImage1}
                            setPickedImage={setPickedImage1}
                            setErrorMessage={setErrorMessage}
                            setIsInvalid={setIsInvalid}
                            isRequired={false}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorPickedImage1}</p>}
                    </div>

                    <div>
                        <label htmlFor="paragraphTwo">Paragraph Two:</label>
                        <textarea
                            id="paragraphTwo"
                            value={paragraphTwo}
                            onChange={(e) => setParagraphTwo(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorParagraphTwo}</p>}
                    </div>

                    <div className={styles.images}>
                        <ImagePicker
                            name="blogImage2"
                            label="Blog Image 2"
                            pickedImage={pickedImage2}
                            setPickedImage={setPickedImage2}
                            setErrorMessage={setErrorMessage}
                            setIsInvalid={setIsInvalid}
                            isRequired={false}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorPickedImage2}</p>}
                    </div>

                    <div>
                        <label htmlFor="paragraphThree">Paragraph Three:</label>
                        <textarea
                            id="paragraphThree"
                            value={paragraphThree}
                            onChange={(e) => setParagraphThree(e.target.value)}
                            required
                        />
                        {isInvalid && <p className={styles.error}>{errorParagraphThree}</p>}
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
