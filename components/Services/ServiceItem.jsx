import Link from "next/link"
import Image from "next/image";
import styles from './ServiceItem.module.scss'
import {PiArrowBendDoubleUpRightLight} from "react-icons/pi";

export default function ServiceItem({service}) {
    const { title, image, icon, slug, isFeatured } = service;

        const linkPath =`/services/${slug}`;

        return (
            <li className={styles.serviceItem}>
                <Link href={linkPath}>
                    <div className={styles.serviceFourItem}>
                        <div className={styles.icon}>
                            <Image src={icon} alt={title} width={60} height={60}/>
                            <PiArrowBendDoubleUpRightLight className={styles.icon}/>
                        </div>
                        <div className={styles.content}>
                            <h2>{title}</h2>
                        </div>
                    </div>
                    <div className={styles.image}>
                        <Image src={image} alt={title} width={300} height={200}/>
                    </div>
                </Link>
            </li>
        );
}