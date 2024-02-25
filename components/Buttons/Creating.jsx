import {Fragment} from "react";
import styles from './Creating.module.css';

export default function Creating({bntText, isLoading}) {

    return (
        <Fragment>
            <button className={styles.button} disabled={isLoading}>{isLoading ? "Loading..." : bntText}</button>
        </Fragment>

    );
}