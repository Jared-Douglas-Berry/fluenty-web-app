import BlogsGrid from "./BlogsGrid.jsx";
import styles from './AllBlogs.module.css'
export default function AllBlogs({blogs}) {
    return (
        <section className={styles.blogs}>
            <div className={styles.text}>
                <h3>Follow along to our blogs</h3>
                <h1>Blogs</h1>
            </div>
            <BlogsGrid blogs={blogs} />
        </section>
    );
}