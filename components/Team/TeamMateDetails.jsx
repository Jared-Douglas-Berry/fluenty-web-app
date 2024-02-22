import styles from './TeamMateDetails.module.css';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function TeamMateDetails({teamMate}) {
    const {
        _id,
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        location,
        linkin,
        facebook,
        twitter,
        instagram,
        middleName,
        summary,
        image,
        experience
    } = teamMate;

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image src={image} alt={firstName} width={800} height={1200} layout='response' />
            </div>
            <div className={styles.content}>
                <h1>{firstName} {middleName} {lastName}</h1>
                <h3>{jobTitle}</h3>
                <p>{summary}</p>

                <h3>Get In Touch</h3>
                <div className={styles.gITContainer}>
                    <span><FaLocationDot size={30} /></span>
                    <div className={styles.gITContent}>
                        <h1>Location</h1>
                        <h2>{location}</h2>
                    </div>
                </div>
                <div className={styles.gITContainer}>
                    <span><IoMdMail size={30} /></span>
                    <div className={styles.gITContent}>
                        <h3>Email Address</h3>
                        <Link href={`mailto:${email}`}><h4>{email}</h4></Link>
                    </div>
                </div>
                <div className={styles.gITContainer}>
                    <span><FaPhone size={30} /></span>
                    <div className={styles.gITContent}>
                        <h3>Phone Us</h3>
                        <Link href={`callto:${phone}`}><h4>{phone}</h4></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
