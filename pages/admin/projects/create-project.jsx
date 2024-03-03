import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import CreateProject from "../../../components/Projects/CreateProject";
import Head from "next/head";

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