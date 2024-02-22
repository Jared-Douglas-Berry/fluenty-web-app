import Image from "next/image";
import styles from './TeamCard.module.css'
import Link from "next/link";
import {PiArrowBendDoubleUpRightLight} from "react-icons/pi";
import {FaFacebook, FaInstagramSquare, FaLinkedin} from "react-icons/fa";
import {AiFillTwitterCircle} from "react-icons/ai";

export default function TeamCard({teamMate}) {
    const {
        _id,
        index,
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
        experience,
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
                        <PiArrowBendDoubleUpRightLight size={50}/>
                    </Link>
                </div>

                <div className={styles.btnSocial}>
                    <Link className={styles.readMore} href={`/team/${slug}`}>
                        <span>View Details</span>
                        <PiArrowBendDoubleUpRightLight size={50}/>
                    </Link>
                    <div className={styles.socialStyleTwo}>
                        <Link className={styles.facebook} href={facebook}><FaFacebook size={42}/></Link>
                        <Link className={styles.twitter} href={twitter}><AiFillTwitterCircle size={47}/></Link>
                        <Link className={styles.instagram} href={instagram}><FaInstagramSquare size={42}/></Link>
                        <Link className={styles.linkin} href={linkin}><FaLinkedin size={42}/></Link>
                    </div>
                </div>
            </div>
        </li>
    );
}