import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import CreateServices from "../../../components/Services/CreateServices";
import Head from "next/head";


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