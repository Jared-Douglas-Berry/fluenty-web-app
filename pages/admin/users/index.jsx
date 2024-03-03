import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Creating from "../../../components/Buttons/Creating";
import Link from "next/link";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import Head from "next/head";

export default function AdminUsers() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Users</title>
                <meta name='description' content='Making the Fluenty Web site users dynamic and creating new content'/>
            </Head>
            <h1>Users</h1>
            <p>Configure your admin Users here.</p>
            <Link href='/admin/users/create-user'>
                <Creating isLoading={false} bntText="Create User"/>
            </Link>
            <p>Configure your admin User here.</p>
            <DynamicTable apiEndpoint='/api/admin/createUser' createPageUrl='/admin/users/create-user' />
        </LayoutAdmin>
    );
}