import styles from "./ProjectDetails.module.css";
import Image from "next/image";

export default function ProjectDetails({project}) {
    const { id, image, title, category, challenge, client, date, location, results } = project;
    return (
        <section className={styles.projects}>
            <div className={styles.content}>
                <h3>Unveiling Our Digital Odyssey</h3>
                <h1>Code Chronicles and Recent Work</h1>
            </div>
            <div>
                <div className={styles.image}>
                    <Image src={image} alt={title} width={1000} height={600} layout='response' />
                </div>
            </div>
        </section>
    );
}
