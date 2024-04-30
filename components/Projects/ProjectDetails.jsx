import styles from "./ProjectDetails.module.scss";
import Image from "next/image";
import ItemCarousel from "../Carousel/ItemCarousel";
import {Fragment} from "react";
import Head from "next/head";
import Link from "next/link";

export default function ProjectDetails({project, projects}) {
    const {
        id,
        image,
        title,
        category,
        challenge,
        client,
        date,
        location,
        results,
        index,
        projectMobileURL,
        projectURL
    } = project;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        <Fragment>
            <Head>
                <title>Fluenty - {title}</title>
                <meta name='description' content={`${title} Fluenty working on`}/>
            </Head>
            <section className={styles.projects}>
                <div className={styles.content}>
                    <h3>Unveiling Our Digital Odyssey</h3>
                    <h1>Code Chronicles and Recent Work</h1>
                </div>
                <div className={styles.container}>
                    <div className={styles.image}>
                        <Image src={image} alt={title} width={1000} height={600}/>
                    </div>

                    <div className={`${styles.row} ${styles.pb35} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                         style={{visibility: 'visible'}}>
                        <div className={styles.colLg4}>
                            <h2 className={`${styles.title} ${styles.mb30}`}>
                                Project Information's
                            </h2>
                        </div>
                        <div className={styles.colLg8}>
                            <div className={`${styles.row} ${styles.rowCols}`}>
                                <div className={styles.col}>
                                    <h5>
                                        Client:
                                    </h5>
                                    <p className={`${styles.subTitle} ${styles.mb20}`}>
                                        {client}
                                    </p>
                                </div>
                                <div className={styles.col}>
                                    <h5>
                                        Category:
                                    </h5>
                                    <p className={`${styles.subTitle} ${styles.mb20}`}>
                                        {category}
                                    </p>
                                </div>
                                <div className={styles.col}>
                                    <h5>
                                        Date:
                                    </h5>
                                    <p className={`${styles.subTitle} ${styles.mb20}`}>
                                        {humanReadableDate}
                                    </p>
                                </div>
                                <div className={styles.col}>
                                    <h5>
                                        Location:
                                    </h5>
                                    <p className={`${styles.subTitle} ${styles.mb20}`}>
                                        {location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.row} ${styles.pb35} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s} ${styles.mt2}`}
                         style={{visibility: 'visible'}}>
                        <div className={`${styles.colLg4} ${styles.display}`}>
                            <h2 className={`${styles.title} ${styles.mb30}`}>
                            </h2>
                        </div>
                        <div className={styles.colLg8}>
                            <div className={`${styles.row} ${styles.rowCols}`}>
                                <div className={styles.col}>
                                    <h5>
                                        Website:
                                    </h5>
                                    <p className={`${styles.subTitle} ${styles.mb20}`}>
                                        <Link
                                            href={`${projectURL}`}
                                            className={styles.url}
                                            target="_blank"
                                        >
                                            {projectURL}
                                        </Link>
                                    </p>
                                </div>
                                {projectMobileURL && (
                                    <div className={styles.col}>
                                        <h5>
                                            Mobile Application:
                                        </h5>
                                        <p className={`${styles.subTitle} ${styles.mb20}`}>
                                            <Link
                                                href={`${projectMobileURL}`}
                                                className={styles.url}
                                                target="_blank"
                                            >
                                                {projectMobileURL}
                                            </Link>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.line}/>

                    <div className={styles.contentCenter}>
                        <div className={styles.gridTwo}>
                            <h2>The Challenge</h2>
                            <p>{challenge}</p>
                        </div>
                    </div>

                    <div className={styles.line}/>

                    <div className={styles.contentCenter}>
                        <div className={styles.gridTwo}>
                            <h2>The Results</h2>
                            <p>{results}</p>
                        </div>
                    </div>

                    <div className={styles.line}/>
                </div>

                <ItemCarousel items={projects} page={'projects'} itemsId={id} index={index} image="image"/>
            </section>
        </Fragment>
    );
}
