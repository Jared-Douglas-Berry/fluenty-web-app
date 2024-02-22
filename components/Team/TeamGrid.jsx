import styles from './TeamGrid.module.css'
import TeamCard from "./TeamCard";

export default function TeamGrid({team}) {
    return (
        <ul className={styles.grid}>
            {team.map(teamMate => <TeamCard key={teamMate.id} teamMate={teamMate} /> )}
        </ul>
    );
}