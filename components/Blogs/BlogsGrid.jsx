import BlogItem from "./BlogItem.jsx";
import styles from './BlogsGrid.module.css'

export default function BlogsGrid({blogs}) {
    return (
        <ul className={styles.grid}>
            {blogs.map(blog => <BlogItem key={blog.slug} blog={blog} /> )}
        </ul>
    );
}