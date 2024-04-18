import styles from "./WholeTeam.module.scss";
import TeamGrid from "./TeamGrid";

export default function WholeTeam({team}) {

    return (
        <section className={styles.projects}>
            <div className={styles.content}>
                <h3>Powering Innovation, Empowering Solutions</h3>
                <h1>Tech Titans</h1>
            </div>
            <TeamGrid team={team} />
        </section>
    );
}