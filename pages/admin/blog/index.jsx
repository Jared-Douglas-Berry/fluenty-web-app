import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Creating from "../../../components/Buttons/Creating";
import Link from "next/link";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import Head from "next/head";

export default function AdminBlog() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Blog</title>
                <meta name='description' content='Making the Fluenty Web site blog dynamic and creating new content'/>
            </Head>
            <h1>Blog</h1>
            <p>Configure your admin Blog here.</p>
            <Link href='/admin/blog/create-blog'>
                <Creating isLoading={false} bntText="Create Blog"/>
            </Link>
            <p>Configure your admin Blog here.</p>
            <DynamicTable apiEndpoint='/api/admin/createBlog' createPageUrl='/admin/blog/create-blog'/>
        </LayoutAdmin>
    );
}