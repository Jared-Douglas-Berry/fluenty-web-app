import styles from './AllTechStacks.module.css'
import TechStackGrid from "./TechStackGrid";
export default function AllTechStacks({techStacks}) {
    return (
        <section className={styles.tech}>
            <div className={styles.text}>
                <h3>Where Expertise Meets Excellence</h3>
                <h1>Tech Mastery and Tech Stack Where Expertise Meets Excellence</h1>
            </div>
            <TechStackGrid techStacks={techStacks} />
        </section>
    );
}