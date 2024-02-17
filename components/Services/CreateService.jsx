'use client';

import {useFormState} from 'react-dom';
import styles from './';
import ImagePicker from '../Images/ImagePicker.js';
import {shareServices} from "../../helpers/actions.jsx";
import Submitting from "../Buttons/Submitting.js";

export default function CreateService() {
    const [state, formAction] = useFormState(shareServices, {message: null});
    return (
        <>
            <header className={styles.header}>
                <h1>
                    Add a Service
                </h1>
            </header>
            <main className={styles.main}>
                <form className={styles.form} action={formAction}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <ImagePicker name="icon" label="Service Icon" />
                    <p>
                        <label htmlFor="summary">Summary</label>
                        <textarea
                            id="summary"
                            name="summary"
                            rows="50"
                            required
                        ></textarea>
                    </p>
                    <ImagePicker name="image" label="Service Image" />
                    {state.message && <p>{state.message}</p>}
                    <p className={styles.actions}>
                        <Submitting bntText='Save Service' />
                    </p>
                </form>
            </main>
        </>
    );
}
