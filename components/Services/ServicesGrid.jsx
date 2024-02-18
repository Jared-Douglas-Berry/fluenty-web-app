import ServiceItem from "./ServiceItem.jsx";
import styles from './ServicesGrid.module.css'

export default function ServicesGrid({services}) {
    return (
        <ul className={styles.grid}>
            {services.map(service => <ServiceItem key={service.slug} service={service} /> )}
        </ul>
    );
}