import {Fragment} from "react";
import styles from './Creating.module.scss';

export default function Creating({bntText, isLoading}) {

    return (
        <Fragment>
            <button className={styles.button} disabled={isLoading}>{isLoading ? "Loading..." : bntText}</button>
        </Fragment>

    );
}