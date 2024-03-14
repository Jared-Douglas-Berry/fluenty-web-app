import styles from './ScrollingBanner.module.css';
import { FaStarOfLife } from "react-icons/fa";

export default function ScrollingBanner({items}) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {items.map((item, index) => <span key={index} className={styles.context}><FaStarOfLife className={styles.icon}/>{item.title}</span>)}
            </div>
        </div>
    );
};
