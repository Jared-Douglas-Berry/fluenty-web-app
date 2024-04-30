import {Fragment} from "react";
import {connectDatabase, getAllDocuments} from "../../helpers/db-utils";
import AllBlogs from "../../components/Blogs/AllBlogs";
import Head from "next/head";

export default function Blogs({blogs}) {
    return (
        <Fragment>
            <Head>
                <title>Fluenty Blogs</title>
                <meta name='description' content='Read the Fluenty blogs to know what happening'/>
            </Head>
            <AllBlogs blogs={blogs} />
        </Fragment>
    );
}

export async function getStaticProps() {
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

    return {
        props: {
            blogs: serializedBlogs,
        },
        // revalidate: 1800,
    };
}