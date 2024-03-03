import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Creating from "../../../components/Buttons/Creating";
import Link from "next/link";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import Head from "next/head";

export default function AdminServices() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Services</title>
                <meta name='description' content='Making the Fluenty Web site services dynamic and creating new content'/>
            </Head>
            <h1>Services</h1>
            <p>Configure your admin Services here.</p>
            <Link href='/admin/services/create-service'>
                <Creating isLoading={false} bntText="Create Service"/>
            </Link>
            <p>Configure your admin Services here.</p>
            <DynamicTable apiEndpoint='/api/admin/createService' createPageUrl='/admin/services/create-service'/>
        </LayoutAdmin>
    );
}