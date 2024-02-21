import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import styles from './ProjectsCarousel.module.css';
import Link from "next/link";
import {PiArrowBendDoubleUpRightLight, PiArrowBendDoubleUpLeftLight} from "react-icons/pi";

export default function ProjectsCarousel({ projects, projectId }) {
    const router = useRouter();
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0); // Initialize with 0
    const [nextProjectIndex, setNextProjectIndex] = useState(0); // Initialize with 0
    const [previousProjectIndex, setPreviousProjectIndex] = useState(0); // Initialize with 0

    useEffect(() => {
        const previousIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        setPreviousProjectIndex(previousIndex);

        const nextIndex = (currentProjectIndex + 1) % projects.length;
        setNextProjectIndex(nextIndex);

        // Find the index of the project with the given projectId
        const index = projects.findIndex(project => project.id === projectId);
        if (index !== -1) {
            setCurrentProjectIndex(index);
        }

    }, [projectId, projects, currentProjectIndex]);

    return (
        <div className={styles.container}>
            <div className={styles.btnLeft}>
                <div className={styles.image}>
                    <Image src={projects[previousProjectIndex].image} alt={projects[previousProjectIndex].title} width={300}
                           height={300}/>
                </div>

                <div className={styles.contentPrevious}>
                    <Link className={styles.title} href={`/projects/${projects[previousProjectIndex].slug}`}>
                        <h2 className={styles.title}>{projects[previousProjectIndex].title}</h2>
                    </Link>

                    <Link className={styles.btn} href={`/projects/${projects[previousProjectIndex].slug}`} >
                        <PiArrowBendDoubleUpLeftLight /> Previous
                    </Link>
                </div>
            </div>

            <div className={styles.btnRight}>
                <div className={styles.contentNext}>
                    <Link className={styles.title} href={`/projects/${projects[nextProjectIndex].slug}`}>
                        <h2 className={styles.title}>{projects[nextProjectIndex].title}</h2>
                    </Link>

                    <Link className={styles.btn} href={`/projects/${projects[nextProjectIndex].slug}`} >
                        Next <PiArrowBendDoubleUpRightLight/>
                    </Link>
                </div>
                <div className={styles.image}>
                    <Image src={projects[nextProjectIndex].image} alt={projects[nextProjectIndex].title} width={300}
                           height={300}/>
                </div>
            </div>
        </div>
    );
}