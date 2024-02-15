import ServicesGrid from "./ServicesGrid.jsx";
import styles from './AllServices.module.css'
export default function AllServices({services}) {
    return (
        <section className={styles.services}>
            <div className='center'>
                <h3>Where Digital Dreams Take Flight</h3>
                <h1>Stellar Services</h1>
            </div>
            <ServicesGrid services={services} />
        </section>
    );
}