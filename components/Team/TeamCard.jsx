import Image from "next/image";
import styles from './TeamCard.module.scss'
import Link from "next/link";
import {PiArrowBendDoubleUpRightLight} from "react-icons/pi";
import {FaFacebookF, FaLinkedinIn} from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

export default function TeamCard({teamMate}) {
    const {
        firstName, lastName, jobTitle, linkin, facebook, twitter, instagram, middleName, image, slug
    } = teamMate;

    return (
        <div
            className={`${styles.row} ${styles.rowCols} ${styles.justifyContentCenter}`}>
            <div className={styles.col}>
                <div className={`${styles.teamMember} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                     style={{ visibility: 'visible' }}>
                    <div className={styles.image}>
                        <Image src={image} alt={jobTitle} width={401} height={458}/>
                    </div>
                    <div className={styles.content}>
                        <h4>{firstName} {middleName} {lastName}</h4>
                        <span>{jobTitle}</span>
                        <Link className={styles.readMore} href={`/team/${slug}`}>
                            <PiArrowBendDoubleUpRightLight/>
                        </Link>
                    </div>
                    <div className={styles.btnSocial}>
                        <Link className={styles.readMore} href={`/team/${slug}`}>
                            <span>View Details</span>
                            <PiArrowBendDoubleUpRightLight/>
                        </Link>
                        <div className={styles.socialStyleTwo}>
                            <Link className={`${styles.fab} ${styles.faFacebookF}`} href={facebook}><FaFacebookF /></Link>
                            <Link className={`${styles.fab} ${styles.faTwitter}`} href={twitter}><FaXTwitter /></Link>
                            <Link className={`${styles.fab} ${styles.faInstagram}`}
                                  href={instagram}><IoLogoInstagram /></Link>
                            <Link className={`${styles.fab} ${styles.faLinkedinIn}`} href={linkin}><FaLinkedinIn /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}