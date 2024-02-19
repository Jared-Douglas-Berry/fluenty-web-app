import styles from './TechStackGrid.module.css'
import TechStackItem from "./TechStackItem";

export default function TechStackGrid({techStacks}) {
    return (
        <ul className={styles.grid}>
            {techStacks.map(techStack => <TechStackItem key={techStack._id} techStack={techStack} /> )}
        </ul>
    );
}