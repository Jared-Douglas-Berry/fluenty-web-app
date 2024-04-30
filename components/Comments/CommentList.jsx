import styles from './CommentList.module.scss';
import Image from "next/image";
import Link from "next/link";
import Modal from '../Modals/Modal.jsx';
import {Fragment, useEffect, useState} from "react";
import NewComment from "./NewComment";
import { useRouter } from 'next/router';
import RepliesList from "./RepliesList";

function CommentList({items}) {
    const [showReplies, setShowReplies] = useState(false);
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const router = useRouter();
    const { slug } = router.query;

    console.log(slug);
    useEffect(() => {
        // Fetch comments when showComments is true or comments is empty
            fetch(`/api/comments/${slug}`)
                .then((response) => response.json())
                .then((data) => {
                    setCommentsData(data.comments);
                });
    }, [comments]);

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const openModal = (index) => {
        setOpenModalIndex(index);
    };

    const closeModal = () => {
        setOpenModalIndex(null);
    };

    function handleDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    function addCommentHandler(commentData) {
        console.log(commentData);
        // send data to API
        fetch(`/api/comments/${slug}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Update comments state with new data
                setComments([...comments, data]);
            });
    }

    return (

        <Fragment>
            <div className={styles.commentsList}>
                <div
                    className={`${styles.commentBody} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                    style={{visibility: 'visible'}}
                >
                    {items.map((item, index) =>
                        <div
                            key={item.id}
                            className={`${styles.commentBody} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
                        >
                            <div className={styles.authorThumb}>

                                <Image src={item.pickedImage1 ? item.pickedImage1 : `/assets/images/noUser.jpeg`}
                                       alt={item.name} width={80} height={80}/>
                            </div>

                            <div className={styles.content}>
                                <ul className={styles.blogMeta}>
                                    <li>
                                        <h6>{item.name}</h6>
                                    </li>
                                    <li>
                                        <Link className={styles.link} href="#">{handleDate(item.createdDate)}</Link>
                                    </li>
                                    {item.replies && (
                                        <li>
                                            <h6>Replies ({item.replies.length})</h6>
                                        </li>
                                    )}

                                </ul>
                                <p>{item.text}</p>

                                {item.replies && (
                                    <div>
                                        {!showReplies && (
                                            <>
                                                <button className={styles.readMoreBtn} onClick={toggleReplies}>Read More</button>
                                            </>

                                        )}
                                        {showReplies && (
                                            <>
                                                <RepliesList items={item.replies}/>
                                                <button className={styles.readMoreBtn} onClick={toggleReplies}>Close Replies</button>
                                            </>

                                        )}

                                    </div>
                                )}

                                <button onClick={() => openModal(index)}>Reply</button>

                                <Modal isOpen={openModalIndex === index} onRequestClose={closeModal}>
                                    <NewComment onAddComment={addCommentHandler} commentDataId={item._id} />
                                </Modal>

                            </div>
                        </div>
                    )}


                </div>

            </div>
        </Fragment>

    )
        ;
}

export default CommentList;
