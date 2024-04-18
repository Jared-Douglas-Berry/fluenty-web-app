import Link from "next/link"
import Image from "next/image";
import styles from './BlogItem.module.scss'
import {LuCalendarDays} from "react-icons/lu";
import {TfiComments} from "react-icons/tfi";
import {GoDotFill} from "react-icons/go";
import {PiArrowBendDoubleUpRightLight} from "react-icons/pi";
import {useEffect, useState} from "react";

export default function BlogItem({blog}) {
    const {
        title,
        image,
        createdDate,
        slug
    } = blog;
    const [comments, setComments] = useState([]);
    const [commentsData, setCommentsData] = useState([]);

        const linkPath =`/blogs/${slug}`;

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
            <li className={styles.serviceItem}>
                    <div className={styles.image}>
                        <Image src={image} alt={title} width={300} height={200} />
                    </div>
                <div className={styles.blogAuthor}>
                    <h4><LuCalendarDays className={styles.iconDot}/> {humanReadableDate}</h4>
                    <GoDotFill className={styles.iconDot}/>
                    <Link className={styles.comments} href={`/blogs/${slug}#comments`}><TfiComments className={styles.iconDot}/>
                        Comment ({commentsData.length})
                    </Link>
                </div>
                <div className={styles.content}>
                    <Link className={styles.content} href={linkPath}>
                        <h2>{title}</h2>
                    </Link>
                </div>
                <div className={styles.btn}>
                    <Link href={linkPath}>
                        Read More <PiArrowBendDoubleUpRightLight/>
                    </Link>
                </div>
            </li>
        );
}