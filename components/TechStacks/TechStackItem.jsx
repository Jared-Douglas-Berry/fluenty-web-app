import Image from "next/image";
import styles from './TechStackItem.module.scss'

export default function TechStackItem({techStack}) {
    const {title, icon} = techStack;

    return (
        <li>
            <div className={styles.pill}>
                <div className={styles.content}>
                    <div className={styles.icon}>
                        <Image src={icon} alt={title} width={60} height={60} />
                    </div>
                    <h2>{title}</h2>
                </div>
            </div>

        </li>
    );
}