import Link from "next/link"
import Image from "next/image";
import styles from './BlogItem.module.scss'
import {LuCalendarDays} from "react-icons/lu";
import {TfiComments} from "react-icons/tfi";
import {PiArrowBendDoubleUpRightLight} from "react-icons/pi";
import React, {useEffect, useState} from "react";

export default function BlogItem({blog}) {
    const {
        title,
        image,
        createdDate,
        slug
    } = blog;
    const [comments, setComments] = useState([]);
    const [commentsData, setCommentsData] = useState([]);

    const linkPath = `/blogs/${slug}`;

    useEffect(() => {
        fetch(`/api/comments/${slug}`)
            .then((response) => response.json())
            .then((data) => {
                setCommentsData(data.comments);
            });
    }, [comments, slug]);

    const humanReadableDate = new Date(createdDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={`${styles.blogItem} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                     style={{visibility: 'visible'}}>
                    <div className={styles.image}>
                        <Image src={image} alt={title} width={300} height={200}/>
                    </div>
                    <ul className={styles.blogMeta}>
                        <li>
                            <Link className={`${styles.far} ${styles.faCalendarAlt}`} href={linkPath}>
                                <LuCalendarDays />
                                {humanReadableDate}
                            </Link>
                        </li>
                        <li>
                            <Link className={`${styles.far} ${styles.faComments}`} href={`/blogs/${slug}#comments`}>
                                <TfiComments />
                                Comment ({commentsData.length})
                            </Link>
                        </li>
                    </ul>
                    <hr/>
                    <Link href={linkPath}>
                        <h4>{title}</h4>
                    </Link>
                    <Link className={styles.readMore} href={linkPath}>
                        Read More <PiArrowBendDoubleUpRightLight/>
                    </Link>
                </div>
            </div>
        </div>
    );
}