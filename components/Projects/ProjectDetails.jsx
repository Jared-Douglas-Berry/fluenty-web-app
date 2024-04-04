import styles from "./ProjectDetails.module.css";
import Image from "next/image";
import ItemCarousel from "../Carousel/ItemCarousel";
import {Fragment} from "react";
import Head from "next/head";
import Link from "next/link";

export default function ProjectDetails({project, projects}) {
    const { id, image, title, category, challenge, client, date, location, results, index, projectMobileURL, projectURL } = project;

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
                <div>
                    <div className={styles.image}>
                        <Image src={image} alt={title} width={1000} height={600} />
                    </div>

                    <div className={styles.contentCenter}>
                        <div className={styles.grid}>
                            <h2>Project Information's</h2>
                            <div className={styles.columnContent}>
                                <h4>Client</h4>
                                <p>{client}</p>
                            </div>
                            <div className={styles.columnContent}>
                                <h4>Category</h4>
                                <p>{category}</p>
                            </div>
                            <div className={styles.columnContent}>
                                <h4>Date</h4>
                                <p>{humanReadableDate}</p>
                            </div>
                            <div className={styles.columnContent}>
                                <h4>Location</h4>
                                <p>{location}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentCenter}>
                        <div className={styles.grid}>
                            <h2></h2>
                            <div className={styles.columnContent}>
                                <h4>Website:</h4>
                                <p>
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
                                <div className={styles.columnContent}>
                                    <h4>Mobile Application:</h4>
                                    <p>
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
