import styles from './CommentList.module.css';
import {GoDotFill} from "react-icons/go";

function CommentList({ items }) {
  function  handleDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return (
    <ul className={styles.comments}>
      {/* Render list of comments - fetched from API */}
        {items.map(item =>
            <li key={item.id}>
              <div className={styles.header}>
                <address>{item.name}</address>
                <GoDotFill className={styles.iconDot}/>
                <p>{handleDate(item.createdDate)}</p>
              </div>
              <p>{item.text}</p>

            </li>)}
    </ul>
  );
}

export default CommentList;
