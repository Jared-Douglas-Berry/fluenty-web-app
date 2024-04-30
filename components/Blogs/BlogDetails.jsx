import Image from "next/image";
import styles from './BlogDetails.module.scss'
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

            <section
                className={`${styles.pageBannerArea} ${styles.overlay} ${styles.pt250} ${styles.pb50} ${styles.rel} ${styles.z1} ${styles.bgsCover}`}
                style={{backgroundImage: `url("/assets/images/fluenty.png")`}}
            >
                <div className={styles.container}>
                    <div className={styles.bannerInner}>
                        <div className={styles.row}>
                            <div className={styles.colXl8}>
                                <ul
                                    className={`${styles.blogMeta} ${styles.mb15} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                                    style={{visibility: 'visible'}}
                                >
                                    <li className={`${styles.fal} ${styles.faUserAlt}`}>
                                        <FaUserTie/> {author}
                                    </li>
                                    <li className={`${styles.fal} ${styles.faCalendarAlt}`}>
                                        <LuCalendarDays/> {humanReadableDate}
                                    </li>
                                    <li className={`${styles.fal} ${styles.faComments}`}>
                                        <Link href={`/blogs/${slug}#comments`}>
                                            <TfiComments/> Comment ({commentsData.length})
                                        </Link>
                                    </li>
                                </ul>
                                <h2
                                    className={`${styles.pageTitle} ${styles.wow} ${styles.fadeInUp} ${styles.delay03s}`}
                                    style={{visibility: 'visible'}}
                                >
                                    {title}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.blogDetailsPage} ${styles.py130} ${styles.rpy100} ${styles.rel} ${styles.rel} ${styles.z1}`}>
                <div className={`${styles.container} ${styles.container1290}`}>
                    <div className={`${styles.row} ${styles.gap60}`}>
                        <div className={styles.colLg8}>
                            <div className={styles.blogSingleContent}>
                                <div
                                    className={`${styles.image} ${styles.mb155} ${styles.rmb100} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                                    style={{visibility: 'visible'}}
                                >
                                    <Image src={image} alt={title} width={300} height={200}/>
                                </div>
                                <p className={styles.bigFirstLetter}>
                                    {paragraphOne}
                                </p>
                                <div className={`${styles.row} ${styles.mt50} ${styles.pb20}`}>
                                    <div className={styles.colMd6}>
                                        {pickedImage1 && (
                                            <div
                                                className={`${styles.image} ${styles.mb30} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                                                style={{visibility: 'visible'}}
                                            >
                                                <Image src={pickedImage1} alt={title} width={300} height={200}/>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.colMd6}>
                                        {pickedImage2 && (
                                            <div
                                                className={`${styles.image} ${styles.mb30} ${styles.wow} ${styles.fadeInUp} ${styles.delay04s}`}
                                                style={{visibility: 'visible'}}
                                            >
                                                <Image src={pickedImage2} alt={title} width={300} height={200}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3>
                                    SUBTITLE
                                </h3>
                                <p>
                                    {paragraphTwo}
                                </p>
                                <br/>
                                <div className={styles.blockquote}>Handling Mounting And Unmounting Of Given Navigation Routes In React
                                    Native
                                    <span className={styles.blockquoteFooter}>
                                        Johnny M. Martin
                                    </span>
                                </div>
                                <br/>
                                <p>
                                    {paragraphThree}
                                </p>
                            </div>
                            {/*<div class="admin-comment bgc-lighter wow fadeInUp delay-0-2s" style="visibility: visible;">*/}
                            {/*    <div class="comment-body">*/}
                            {/*        <div class="author-thumb">*/}
                            {/*            <img src="assets/images/blog/admin-author.jpg" alt="Author"/>*/}
                            {/*        </div>*/}
                            {/*        <div class="content">*/}
                            {/*            <h5>Richard M. Fudge</h5>*/}
                            {/*            <p>*/}
                            {/*                We denounce with righteous*/}
                            {/*            indignation and dislike men beguiled and demoralized by the charms of pleasure*/}
                            {/*            of the moment*/}
                            {/*            </p>*/}
                            {/*            <div class="social-style-one"><a href="/contact"><i*/}
                            {/*                class="fab fa-facebook-f"></i></a><a href="/contact"><i*/}
                            {/*                class="fab fa-twitter"></i></a><a href="/contact"><i*/}
                            {/*                class="fab fa-linkedin-in"></i></a><a href="/contact"><i*/}
                            {/*                class="fab fa-instagram"></i></a></div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <ItemCarousel items={blogs} itemsId={id} page={'blogs'} index={index} image="pickedImage"/>

                            <h3 className={`${styles.commentTitle} ${styles.mb50}`}>
                                Popular Comments
                            </h3>

                            <Comments slug={slug}/>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );

}