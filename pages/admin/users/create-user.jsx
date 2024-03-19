import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";
import dynamic from "next/dynamic";
const CreateUser = dynamic(() => import('../../../components/Users/CreateUser'));

export default function AdminUserCreate() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Users</title>
                <meta name='description' content='Creating new user for Fluenty Web site'/>
            </Head>
            <CreateUser />
        </LayoutAdmin>

    );
}