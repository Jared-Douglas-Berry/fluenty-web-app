import styles from './TeamMateDetails.module.scss';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {Fragment} from "react";
import Head from "next/head";

export default function TeamMateDetails({teamMate}) {
    const {
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        location,
        middleName,
        summary,
        image,
    } = teamMate;

    return (
        <Fragment>
            <Head>
                <title>Fluenty Team Mate - {firstName} {middleName} {lastName}</title>
                <meta name='description' content={`Fluenty Team Mate - ${firstName} ${middleName} ${lastName}`}/>
            </Head>

            <section
                className={`${styles.teamProfileArea} ${styles.pt220} ${styles.rpt150} ${styles.pb130} ${styles.rpb100} ${styles.rel}`}
            >
                <div className={`${styles.container} ${styles.container1290}`}>
                    <div className={`${styles.row} ${styles.alignItemsCenter}`}>
                        <div className={styles.colLg6}>
                            <div
                                className={`${styles.teamProfileImage} ${styles.rmb55} ${styles.wow} ${styles.fadeInLeft} ${styles.delay02s}`}
                                style={{visibility: 'visible'}}
                            >
                                <Image src={image} alt={firstName} width={800} height={1200}/>
                            </div>
                        </div>
                        <div className={styles.colLg6}>
                            <div
                                className={`${styles.teamProfileContent} ${styles.wow} ${styles.fadeInRight} ${styles.delay02s}`}
                                style={{visibility: 'visible'}}
                            >
                                <h2>
                                    {firstName} {middleName} {lastName}
                                </h2>
                                <span className={styles.designation}>
                                    {jobTitle}
                                </span>
                                <p>
                                    {summary}
                                </p>
                                <div className={`${styles.teamSubTitle} ${styles.mt55} ${styles.mb30}`}>
                                    <h4>
                                        Get In Touch
                                    </h4>
                                </div>
                                <div className={styles.contactInfoItem}>
                                    <div className={styles.icon}>
                                        <FaLocationDot/>
                                    </div>
                                    <div className={styles.content}>
                                        <b className={styles.title}>
                                            Location
                                        </b>
                                        <span className={styles.text}>
                                            {location}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.contactInfoItem}>
                                    <div className={styles.icon}>
                                        <IoMdMail/>
                                    </div>
                                    <div className={styles.content}>
                                        <b className={styles.title}>
                                            Email Address
                                        </b>
                                        <span className={styles.text}>
                                            <Link href={`mailto:${email}`}>
                                                {email}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.contactInfoItem}>
                                    <div className={styles.icon}>
                                        <FaPhone/>
                                    </div>
                                    <div className={styles.content}>
                                        <b className={styles.title}>
                                            Phone Us
                                        </b>
                                        <span className={styles.text}>
                                            <Link href={`callto:${phone}`}>
                                                {phone}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>

    );
}
