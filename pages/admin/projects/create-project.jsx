import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";
import dynamic from "next/dynamic";
const CreateProject = dynamic(() => import('../../../components/Projects/CreateProject'));

export default function AdminProjectCreate() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Projects</title>
                <meta name='description' content='Making the Fluenty Web site projects dynamic and creating new content'/>
            </Head>
            <CreateProject />
        </LayoutAdmin>

    );
}