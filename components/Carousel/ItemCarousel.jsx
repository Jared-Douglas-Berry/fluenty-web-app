import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import styles from './ItemCarousel.module.css';
import Link from "next/link";
import {PiArrowBendDoubleUpRightLight, PiArrowBendDoubleUpLeftLight} from "react-icons/pi";

export default function ItemCarousel({ items, itemsId, page }) {
    const router = useRouter();
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0); // Initialize with 0
    const [nextProjectIndex, setNextProjectIndex] = useState(0); // Initialize with 0
    const [previousProjectIndex, setPreviousProjectIndex] = useState(0); // Initialize with 0

    useEffect(() => {
        const previousIndex = (currentProjectIndex - 1 + items.length) % items.length;
        setPreviousProjectIndex(previousIndex);

        const nextIndex = (currentProjectIndex + 1) % items.length;
        setNextProjectIndex(nextIndex);

        // Find the index of the project with the given itemsId
        const index = items.findIndex(project => project.id === itemsId);
        if (index !== -1) {
            setCurrentProjectIndex(index);
        }

    }, [itemsId, items, currentProjectIndex]);

    return (
        <div className={styles.container}>
            <div className={styles.btnLeft}>
                <div className={styles.image}>
                    <Image src={items[previousProjectIndex].image} alt={items[previousProjectIndex].title} width={300}
                           height={300}  layout='responsive'/>
                </div>

                <div className={styles.contentPrevious}>
                    <Link className={styles.title} href={`/${page}/${items[previousProjectIndex].slug}`}>
                        <h2 className={styles.title}>{items[previousProjectIndex].title}</h2>
                    </Link>

                    <Link className={styles.btn} href={`/${page}/${items[previousProjectIndex].slug}`} >
                        <PiArrowBendDoubleUpLeftLight /> Previous
                    </Link>
                </div>
            </div>

            <div className={styles.btnRight}>
                <div className={styles.contentNext}>
                    <Link className={styles.title} href={`/${page}/${items[nextProjectIndex].slug}`}>
                        <h2 className={styles.title}>{items[nextProjectIndex].title}</h2>
                    </Link>

                    <Link className={styles.btn} href={`/${page}/${items[nextProjectIndex].slug}`} >
                        Next <PiArrowBendDoubleUpRightLight/>
                    </Link>
                </div>
                <div className={styles.image}>
                    <Image src={items[nextProjectIndex].image} alt={items[nextProjectIndex].title} width={300}
                           height={300} layout='responsive'/>
                </div>
            </div>
        </div>
    );
}