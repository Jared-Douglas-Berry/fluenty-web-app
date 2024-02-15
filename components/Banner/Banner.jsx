import styles from './Banner.module.css';
import Image from "next/image";

export default function Banner() {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1>Software Development Marvels</h1>
                <h3>We're <span className={styles.textBlue}>code</span> craftsmen & <span
                    className={styles.textBlue}>tech</span> solution professionals
                </h3>
                <p>Unlock Innovation Through Our expertise</p>
                <p>Collaborative solutions, limitless possibilities</p>
            </div>
            <div className={styles.imageContainer}>
                <div className={styles.image}>
                    <Image
                        src='/assets/images/facingRobot.png'
                        alt='Robot Image'
                        height={300}
                        width={300}
                    />
                </div>
            </div>
        </div>
    );
}