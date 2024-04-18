import Image from "next/image";
import styles from './TeamCard.module.scss'
import Link from "next/link";
import {PiArrowBendDoubleUpRightLight} from "react-icons/pi";
import {FaFacebook, FaInstagramSquare, FaLinkedin} from "react-icons/fa";
import {AiFillTwitterCircle} from "react-icons/ai";

export default function TeamCard({teamMate}) {
    const {
        firstName,
        lastName,
        jobTitle,
        linkin,
        facebook,
        twitter,
        instagram,
        middleName,
        image,
        slug
    } = teamMate;


    return (
        <li>
            <div className={styles.teamMember}>
                <div className={styles.image}>
                    <Image src={image} alt={jobTitle} width={300} height={300}/>
                </div>

                <div className={styles.content}>
                    <h4>{firstName} {middleName} {lastName}</h4>
                    <span>{jobTitle}</span>
                    <Link className={styles.readMore} href={`/team/${slug}`}>
                        <PiArrowBendDoubleUpRightLight />
                    </Link>
                </div>

                <div className={styles.btnSocial}>
                    <Link className={styles.readMore} href={`/team/${slug}`}>
                        <span>View Details</span>
                        <PiArrowBendDoubleUpRightLight />
                    </Link>
                    <div className={styles.socialStyleTwo}>
                        <Link className={styles.facebook} href={facebook}><FaFacebook /></Link>
                        <Link className={styles.twitter} href={twitter}><AiFillTwitterCircle /></Link>
                        <Link className={styles.instagram} href={instagram}><FaInstagramSquare /></Link>
                        <Link className={styles.linkin} href={linkin}><FaLinkedin /></Link>
                    </div>
                </div>
            </div>
        </li>
    );
}