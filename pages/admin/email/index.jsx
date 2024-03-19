import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";
import dynamic from "next/dynamic";
const CreateSubjects = dynamic(() => import('../../../components/Email/CreateSubjects'));

export default function AdminEmail() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Email</title>
                <meta name='description' content='Creating subjects for the contact us email for Fluenty Web site'/>
            </Head>
            <h1>Email</h1>
            <p>Configure your admin Email here.</p>
            <CreateSubjects />
        </LayoutAdmin>
    );
}