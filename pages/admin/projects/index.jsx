import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Link from "next/link";
import Creating from "../../../components/Buttons/Creating";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import Head from "next/head";

export default function AdminProjects() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Projects</title>
                <meta name='description' content='Making the Fluenty Web site projects dynamic and creating new content'/>
            </Head>
            <h1>Projects</h1>
            <p>Configure your admin Projects here.</p>
            <Link href='/admin/projects/create-project'>
                <Creating isLoading={false} bntText="Create Project"/>
            </Link>
            <p>Configure your admin Projects here.</p>
            <DynamicTable apiEndpoint='/api/admin/createProject' createPageUrl='/admin/projects/create-project'/>
        </LayoutAdmin>
    );
}