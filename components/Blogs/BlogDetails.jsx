import Image from "next/image";
import styles from './BlogDetails.module.css'
import {Fragment, useEffect, useState} from "react";
import Head from "next/head";
import Link from "next/link";
import { FaUserTie } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { TfiComments } from "react-icons/tfi";
import ItemCarousel from "../Carousel/ItemCarousel";
import Comments from "../Comments/Comments";
import { GoDotFill } from "react-icons/go";

export default function BlogDetails({blogs, blog}) {
    const {
        id,
        author,
        title,
        paragraphOne,
        paragraphTwo,
        paragraphThree,
        image,
        pickedImage1,
        pickedImage2,
        createdDate,
        index
    } = blog;
    const [comments, setComments] = useState([]);
    const [commentsData, setCommentsData] = useState([]);

    const slug = title.trim().replace(/\s+/g, "-");

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
        <Fragment>
            <Head>
                <title>Fluenty blog - {title}</title>
                <meta name='description' content={`Read the Fluenty blog the ${title} to know what happening`}/>
            </Head>
            <main className={styles.main}>
                <div className={styles.blogAuthor}>
                        <h4><FaUserTie className={styles.iconDot}/> {author}</h4>
                        <GoDotFill className={styles.iconDot}/>
                        <h4><LuCalendarDays className={styles.iconDot}/> {humanReadableDate}</h4>
                        <GoDotFill className={styles.iconDot}/>
                        <nav className={styles.navigation}>
                            <ul className={styles.navigationContainer}>
                                <li className={styles.linkItem}>
                                    <Link href={`/blogs/${slug}#comments`}><TfiComments className={styles.iconDot}/> Comment ({commentsData.length})</Link>
                                </li>
                            </ul>
                        </nav>
                </div>
                <div className={styles.title}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <Image src={image} alt={title} width={300} height={200} layout='responsive'/>
                    </div>
                    <div>
                        <p>{paragraphOne}</p>
                    </div>
                    {pickedImage1 && (
                        <div className={styles.image}>
                            <Image src={pickedImage1} alt={title} width={300} height={200} layout='responsive'/>
                        </div>
                    )}
                    <div>
                        <p>{paragraphTwo}</p>
                    </div>
                    {pickedImage2 && (
                        <div className={styles.image}>
                            <Image src={pickedImage2} alt={title} width={300} height={200} layout='responsive'/>
                        </div>
                    )}
                    <div>
                        <p>{paragraphThree}</p>
                    </div>
                </div>

                <ItemCarousel items={blogs} itemsId={id} page={'blogs'} index={index} image="pickedImage" />

                <section className={styles.comments} id="comments">
                    <h2>Popular Comments</h2>
                    <Comments slug={slug}/>
                </section>

            </main>

        </Fragment>
    );

}