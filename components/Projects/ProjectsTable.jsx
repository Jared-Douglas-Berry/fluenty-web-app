import styles from './ProjectsTable.module.scss';
import { Fragment } from "react";
import Image from "next/image";
import { PiArrowBendDoubleUpRightLight } from "react-icons/pi";
import Link from "next/link";

export default function ProjectsTable({ projects }) {

    return (
        <Fragment>
            {projects.map(project =>
                <div key={project._id} className={styles.projectTimeline}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <span
                                className={styles.serialNumber}>{project.index + 1 <= 9 ? '0' + (project.index + 1) : project.index + 1}</span>
                            <h4>
                                <Link href={`/projects/${project.slug}`}>
                                    {project.title}
                                </Link>
                            </h4>
                        </div>
                        <div className={styles.image}>
                            <Image src={project.image} alt={project.title} width={300} height={300}/>
                        </div>
                        <div className={styles.rightBtn}>
                            <Link href={`/projects/${project.slug}`} className={styles.detailsBtn}>
                                <PiArrowBendDoubleUpRightLight className={styles.icon}/>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};