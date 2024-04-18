import {useEffect, useState} from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './Comments.module.scss';

function Comments({ slug }) {

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

    useEffect(() => {
        if (showComments) { // Fetch comments when showComments is true or comments is empty
            fetch(`/api/comments/${slug}`)
                .then((response) => response.json())
                .then((data) => {
                    setCommentsData(data.comments);
                });
        }
    }, [showComments, comments, slug]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
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
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <CommentList items={commentsData} />}
        {showComments && <h1>Leave a comment</h1>}
        {showComments && <NewComment onAddComment={addCommentHandler} />}

    </section>
  );
}

export default Comments;
