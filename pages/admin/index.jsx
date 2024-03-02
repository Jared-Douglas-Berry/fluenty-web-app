import LayoutAdmin from "../../components/Layout/LayoutAdmin";
import Head from "next/head";

export default function AdminPage() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin</title>
                <meta name='description' content='Fluenty Admin Development'/>
            </Head>
            <h1>Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
        </LayoutAdmin>
    );
}


