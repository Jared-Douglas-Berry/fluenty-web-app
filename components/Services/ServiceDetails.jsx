import Image from "next/image";
import styles from './ServiceDetails.module.css'
import {Fragment} from "react";
import Head from "next/head";

export default function ServiceDetails({service}) {
    const { title, image, summary} = service;

    return (
        <Fragment>
            <Head>
                <title>Fluenty - {title}</title>
                <meta name='description' content={`Fluenty ${title}`}/>
            </Head>
            <main className={styles.main}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.image}>
                    <Image src={image} alt={title} width={300} height={200} layout='responsive'/>
                </div>
                <div className={styles.content}>
                    <p>{summary}</p>
                </div>
            </main>

        </Fragment>
    );

}