import styles from "./ProjectDetails.module.css";
import Image from "next/image";
import ProjectsCarousel from "./ProjectsCarousel";

export default function ProjectDetails({project, projects}) {
    const { id, image, title, category, challenge, client, date, location, results, index } = project;
    return (
        <section className={styles.projects}>
            <div className={styles.content}>
                <h3>Unveiling Our Digital Odyssey</h3>
                <h1>Code Chronicles and Recent Work</h1>
            </div>
            <div>
                <div className={styles.image}>
                    <Image src={image} alt={title} width={1000} height={600} layout='response'/>
                </div>

                <div className={styles.contentCenter}>
                    <div className={styles.grid}>
                        <h2>Project Information's</h2>
                        <div className={styles.columnContent}>
                            <h4>Client</h4>
                            <p>{client}</p>
                        </div>
                        <div className={styles.columnContent}>
                            <h4>Category</h4>
                            <p>{category}</p>
                        </div>
                        <div className={styles.columnContent}>
                            <h4>Date</h4>
                            <p>{date}</p>
                        </div>
                        <div className={styles.columnContent}>
                            <h4>Location</h4>
                            <p>{location}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.line}/>

                <div className={styles.contentCenter}>
                    <div className={styles.gridTwo}>
                        <h2>The Challenge</h2>
                        <p>{challenge}</p>
                    </div>
                </div>

                <div className={styles.line}/>

                <div className={styles.contentCenter}>
                    <div className={styles.gridTwo}>
                        <h2>The Results</h2>
                        <p>{results}</p>
                    </div>
                </div>

                <div className={styles.line}/>
            </div>

            <ProjectsCarousel projects={projects} index={index} projectId={id} />
        </section>
    );
}
