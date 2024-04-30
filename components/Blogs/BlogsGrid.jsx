import BlogItem from "./BlogItem.jsx";
import styles from './BlogsGrid.module.scss'

export default function BlogsGrid({blogs}) {
    return (
        <div className={styles.grid}>
            {blogs.map(blog => <BlogItem key={blog.slug} blog={blog} /> )}
        </div>
    );
}