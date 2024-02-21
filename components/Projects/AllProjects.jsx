import styles from "./AllProjects.module.css";
import ProjectsTable from "./ProjectsTable";

export default function AllProjects({projects}) {

    return (
        <section className={styles.projects}>
            <div className={styles.content}>
                <h3>Unveiling Our Digital Odyssey</h3>
                <h1>Code Chronicles and Recent Work</h1>
            </div>
            <ProjectsTable projects={projects} />
        </section>
    );
}
