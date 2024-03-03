import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Creating from "../../../components/Buttons/Creating";
import Link from "next/link";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import Head from "next/head";

export default function AdminTech() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Tech Stacks</title>
                <meta name='description' content='Making the Fluenty Web site tech stacks dynamic and creating new content'/>
            </Head>
            <h1>Tech Stack</h1>
            <p>Configure your admin Tech Stack here.</p>
            <Link href='/admin/tech/create-tech'>
                <Creating isLoading={false} bntText="Create Tech Stack"/>
            </Link>
            <p>Configure your admin Tech Stack here.</p>
            <DynamicTable apiEndpoint='/api/admin/createTech' createPageUrl='/admin/tech/create-tech' />
        </LayoutAdmin>
    );
}