import {useRef, useState} from 'react';
import styles from './NewComment.module.scss';

function NewComment(props) {
    const [isInvalid, setIsInvalid] = useState(false);

    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const commentInputRef = useRef();

    function sendCommentHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredComment = commentInputRef.current.value;

        if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@') ||
            !enteredName ||
            enteredName.trim() === '' ||
            !enteredComment ||
            enteredComment.trim() === ''
        ) {
            setIsInvalid(true);
            return;
        }

        // Reset input fields to empty strings
        emailInputRef.current.value = '';
        nameInputRef.current.value = '';
        commentInputRef.current.value = '';

        console.log(props.commentDataId);
        if (props.commentDataId) {
            props.onAddComment({
                email: enteredEmail,
                name: enteredName,
                text: enteredComment,
                _id: props.commentDataId,
            });
        } else {
            props.onAddComment({
                email: enteredEmail,
                name: enteredName,
                text: enteredComment,
            });
        }

    }

    return (
        <form
            onSubmit={sendCommentHandler}
            id="comment-form"
            className={`${styles.commentForm} ${styles.bgcLighter} ${styles.wow} ${styles.fadeInUp} ${styles.delay02s}`}
            name="comment-form"
            action="#"
            method="post"
            style={{visibility: 'visible'}}
        >
            <h4>
                Leave a Reply
            </h4>
            <p>
                we denounce with righteous indignation and dislike men who beguiled
            </p>
            <div className={`${styles.row} ${styles.mt30}`}>
                <div className={styles.colMd6}>
                    <div className={styles.formGroup}>
                        <label htmlFor='name'>Your full name</label>
                        <input
                            type='text'
                            id='name'
                            name="full-name"
                            className={styles.formControl}
                            ref={nameInputRef}
                            placeholder="Full Name"
                            required=""
                        />
                    </div>
                </div>
                <div className={styles.colMd6}>
                    <div className={styles.formGroup}>
                        <label htmlFor='email'>Your email</label>
                        <input
                            type='email'
                            id='email'
                            name="blog-email"
                            className={styles.formControl}
                            ref={emailInputRef}
                            placeholder="Email Address"
                            required=""
                        />
                    </div>
                </div>
                <div className={styles.colMd6}>
                    <div className={styles.formGroup}>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            className={styles.formControl}
                            placeholder="Website"
                            required=""
                        />
                    </div>
                </div>
                <div className={styles.colMd6}>
                    <div className={styles.formGroup}>
                        <label htmlFor='comment'>Your comment</label>
                        <textarea
                            name="message"
                            id='comment'
                            className={styles.formControl}
                            rows='5'
                            placeholder="Message"
                            ref={commentInputRef}
                        ></textarea>
                    </div>
                </div>
                <div className={styles.colMd6}>
                    <div className={`${styles.formGroup} ${styles.mb0}`}>
                        {isInvalid && <p>Please enter a valid email address and comment!</p>}
                        <button
                            type="submit"
                            className={`${styles.themeBtn} ${styles.styleTwo} ${styles.w100}`}
                        >
                            Send a Reply
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default NewComment;
