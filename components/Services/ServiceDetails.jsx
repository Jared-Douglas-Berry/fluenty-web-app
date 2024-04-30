import Image from "next/image";
import styles from './ServiceDetails.module.scss'
import {Fragment} from "react";
import Head from "next/head";
import { SiIcinga } from "react-icons/si";

export default function ServiceDetails({service}) {
    const { title, image, summary} = service;

    return (
        <Fragment>
            <Head>
                <title>Fluenty - {title}</title>
                <meta name='description' content={`Fluenty ${title}`}/>
            </Head>
            <main className={styles.main}>
                <div className={styles.title}>
                    <h2>{title}: <SiIcinga className={styles.iconTitle} /></h2>
                </div>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <Image src={image} alt={title} width={300} height={200} />
                    </div>
                    <div className={styles.summary}>
                        <p>{summary}</p>
                    </div>
                </div>

            </main>

        </Fragment>
    );

}