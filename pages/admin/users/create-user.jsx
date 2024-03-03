import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import CreateUser from "../../../components/Users/CreateUser";
import Head from "next/head";

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