import styles from './TeamGrid.module.scss'
import TeamCard from "./TeamCard";

export default function TeamGrid({team}) {
    return (
        <div className={styles.grid}>
            {team.map(teamMate => <TeamCard key={teamMate._id} teamMate={teamMate}/>)}
        </div>
    );
}