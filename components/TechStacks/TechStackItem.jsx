import Image from "next/image";
import styles from './TechStackItem.module.css'

export default function TechStackItem({techStack}) {
    const {title, icon} = techStack;

    return (
        <li>
            <div className={styles.pill}>
                <div className={styles.content}>
                    <div className={styles.icon}>
                        <Image src={icon} alt={title} width={80} height={80} />
                    </div>
                    <h2>{title}</h2>
                </div>
            </div>

        </li>
    );
}