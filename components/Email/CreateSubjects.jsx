import {Fragment, useEffect, useState} from "react";
import styles from "./CreateSubjects.module.scss";
import Submitting from "../Buttons/Submitting";
import { MdAddCircleOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Head from "next/head";

export default function CreateSubjects() {
    const [subjectsId, setSubjectsId] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorSubjects, setErrorSubjects] = useState('');

    useEffect(() => {
        setIsLoading(true);

        fetch(`/api/admin/createEmailSubject`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error fetching Subjects from our data base.');
                }
            })
            .then((data) => {
                if (data.subjects.length === 0 ) {
                    setSubjects([{ id: 1, value: '' }]);
                } else if (data.subjects.length > 0) {
                    setSubjectsId(data.subjects[0]._id)
                    setSubjects(data.subjects[0].subjects);
                } else {
                    throw new Error('Data returned from the API is not in the expected format.');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
                setErrorMessage(error.message);
            });
    }, []);

    const handleAddInput = () => {
        const newInput = { id: subjects.length + 1, label: '', value: '' };
        setSubjects([...subjects, newInput]);
    };

    const handleInputChange = (id, label, value) => {
        const updatedSubjects = subjects.map(subject =>
            subject.id === id ? { ...subject, label, value } : subject
        );
        setSubjects(updatedSubjects);
    };

    const handleRemoveInput = id => {
        const filteredSubjects = subjects.filter(subject => subject.id !== id);
        setSubjects(filteredSubjects);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsInvalid(false);

        try {
            if (
                !subjects
            ) {
                if (!subjects) {
                    setIsInvalid(true);
                    setErrorSubjects('Invalid title')
                    setErrorMessage('Invalid title')
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
                subjects,
                documentIdToUpdate: subjectsId
            }

            const res = await fetch('/api/admin/createEmailSubject', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (res.ok) {
                setIsLoading(false);
            } else {
                setIsInvalid(true);
                setErrorMessage('Error: Could not submit data to database');
                setIsLoading(false);
                // Handle error
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
                <title>Fluenty Admin Project</title>
                <meta name='description' content='Creating new project for Fluenty Web site'/>
            </Head>
            <form className={styles.container} onSubmit={handleSubmit}>
                <div>
                    {subjects.map(subject => (
                        <div key={subject.id} className={styles.content}>
                            <input
                                type="text"
                                value={subject.value}
                                onChange={e => handleInputChange(subject.id, e.target.value, e.target.value)}
                            />
                            <MdAddCircleOutline onClick={handleAddInput} className={styles.plus} size={40}/>
                            <FaTrashAlt onClick={() => handleRemoveInput(subject.id)} className={styles.trash}
                                        size={40}/>
                        </div>
                    ))}
                    {isInvalid && <p className={styles.error}>{errorSubjects}</p>}
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
        </Fragment>
    );
}
