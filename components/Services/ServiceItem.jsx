import Link from "next/link"
import Image from "next/image";
import styles from './ServiceItem.module.css'

export default function ServiceItem({service}) {
    const { title, image, icon, slug } = service;

    const linkPath =`/services/${slug}`;

    return (
        <li className={styles.service}>
            <Link href={linkPath}>
                <div className={styles.icon}>
                    <Image src={icon} alt={title} width={300} height={200} layout='responsive'/>
                </div>
                <div className={styles.content}>
                    <h3>{title}</h3>
                </div>
                <div className={styles.image}>
                    <Image src={image} alt={title} width={300} height={200} layout='responsive'/>
                </div>
            </Link>
        </li>
    );
}