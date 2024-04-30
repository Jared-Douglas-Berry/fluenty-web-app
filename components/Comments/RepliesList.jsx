import styles from './RepliesList.module.scss';
import Image from "next/image";
import Link from "next/link";
import {Fragment, useEffect, useState} from "react";

function ReplyList({items}) {
    function handleDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    return (

        <Fragment>
            <div className={styles.replyList}>
                <div
                    className={`${styles.replyBody} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                    style={{visibility: 'visible'}}
                >
                    {items.map((item) =>
                        <div
                            key={item.id}
                            className={`${styles.replyBody} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                        >
                            <div className={styles.content}>
                                <ul className={styles.blogMetaReply}>
                                    <li>
                                        <div className={styles.authorThumb}>
                                            <Image
                                                src={item.pickedImage1 ? item.pickedImage1 : `/assets/images/noUser.jpeg`}
                                                alt={item.name} width={40} height={40}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <h6>{item.name}</h6>
                                    </li>
                                    <li>
                                        <Link className={styles.link} href="#">{handleDate(item.createdDate)}</Link>
                                    </li>
                                </ul>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    )}


                </div>

            </div>
        </Fragment>

    )
        ;
}

export default ReplyList;
