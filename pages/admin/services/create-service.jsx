import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";
import dynamic from "next/dynamic";
const CreateServices = dynamic(() => import('../../../components/Services/CreateServices'));


export default function AdminServiceCreate() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Service</title>
                <meta name='description' content='Creating new service for Fluenty Web site'/>
            </Head>
            <CreateServices />
        </LayoutAdmin>

    );
}