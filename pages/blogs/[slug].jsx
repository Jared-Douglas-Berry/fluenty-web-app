import {
    connectDatabase, getAllDocuments,
    getDocumentIdFind,
    getDocumentIdFindOne
} from "../../helpers/db-utils";
import BlogDetails from "../../components/Blogs/BlogDetails";

export default function BlogDetailsPage({blogs, selectedBlog}) {
    return (
        <div>
            <BlogDetails blogs={blogs} blog={selectedBlog}/>
        </div>
    );
}


export async function getStaticPaths() {
    const client = await connectDatabase();

    const blogs = await getDocumentIdFind(client, process.env.mongodb_database, process.env.mongodb_database_blog)

    const paths = blogs.map((blog) => ({
        params: {slug: blog._id.toString()},
    }));

    client.close();

    return {
        fallback: 'blocking',
        paths: paths,

    };
}

export async function getStaticProps(context) {
    try {
        const client = await connectDatabase();

        const blogs = await getAllDocuments(client, process.env.mongodb_database, process.env.mongodb_database_blog, { _id: -1 });

// Extract only the necessary data for serialization
        const serializedBlogs = blogs.map((blog, index) => ({
            // Assuming _id is a string, if not, replace it with the appropriate property
            index: index,
            id: blog._id.toString(),
            author: blog.author,
            title: blog.title,
            paragraphOne: blog.paragraphOne,
            paragraphTwo: blog.paragraphTwo,
            paragraphThree: blog.paragraphThree,
            image: blog.pickedImage.src,
            pickedImage1: blog.pickedImage1.src,
            pickedImage2: blog.pickedImage2.src,
            modifiedDate: blog.modifiedDate.toISOString(),
            createdDate: blog.createdDate.toISOString(),
            slug: blog.title.trim().replace(/\s+/g, "-")
            // Include other necessary fields here
        }));

        // fetch data for a single meetup
        const blogSlug = context.params.slug;

        const blogId = blogSlug.replace(/-/g, " ");

        if (!blogId) {
            throw new Error("Blogs ID is missing");
        }

        const blog = await getDocumentIdFindOne(client, process.env.mongodb_database, process.env.mongodb_database_blog, {title: blogId})

        client.close();

        if (!blog) {
            throw new Error("Blogs not found");
        }

        return {
            props: {
                blogs: serializedBlogs,
                selectedBlog: {
                    id: blog._id.toString(),
                    author: blog.author,
                    title: blog.title,
                    paragraphOne: blog.paragraphOne,
                    paragraphTwo: blog.paragraphTwo,
                    paragraphThree: blog.paragraphThree,
                    image: blog.pickedImage.src,
                    pickedImage1: blog.pickedImage1.src,
                    pickedImage2: blog.pickedImage2.src,
                    modifiedDate: blog.modifiedDate.toISOString(),
                    createdDate: blog.createdDate.toISOString(),
                    slug: blog.title.trim().replace(/\s+/g, "-")
                },
            },
            revalidate: 1
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            notFound: true,
        };
    }
}
