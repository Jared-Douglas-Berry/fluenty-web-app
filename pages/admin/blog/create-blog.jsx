import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";
import dynamic from "next/dynamic";
const CreateBlog = dynamic(() => import('../../../components/Blogs/CreateBlog'));

export default function AdminBlogCreate() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Blog Create</title>
                <meta name='description' content='creating new Fluenty Web site blog content'/>
            </Head>
            <CreateBlog />
        </LayoutAdmin>

    );
}