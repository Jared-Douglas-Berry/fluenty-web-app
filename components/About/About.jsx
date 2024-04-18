import styles from "./About.module.scss";

export default function About() {
    return (
        <section className={styles.about}>
            <div className={styles.content}>
                <h3>Unveiling Our Digital Odyssey</h3>
                <h1>About</h1>
            </div>

            <div className={styles.contact}>
                <h3>SOFTWARE SPECIALISTS</h3>
                <div className={styles.line}/>
                <h1>
                    Our dynamic team with a variety of specialized skills and knowledge is perfect for tailored
                    solutions specific to your needs.
                </h1>
                <p>
                    Adaption, collaboration, and client satisfaction are at the heart of everything we do. Trusted by
                    South Africa's leading enterprises, we tackle challenges with finesse. Let us join your journey and
                    help you push boundaries and redefine possibilities in the world of software development.
                </p>
                <span>Tech is our strength and we are here to support you every step of the way.</span>
            </div>
        </section>
    );
}