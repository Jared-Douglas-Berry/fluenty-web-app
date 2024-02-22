import {Fragment} from "react";
import styles from './Submitting.module.css';

export default function Submitting({bntText, isInvalid, isLoading, error}) {

    return (
        <Fragment>
            {isInvalid && <p className={styles.error}>{error}</p>}
            <button className={styles.button} disabled={isLoading}>{isLoading ? 'Submitting...' : bntText}</button>
        </Fragment>

    );
}
