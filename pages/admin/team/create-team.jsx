import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";
import dynamic from "next/dynamic";
const CreateTeamMate = dynamic(() => import('../../../components/Team/CreateTeamMate'));

export default function AdminTeamCreate() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Team</title>
                <meta name='description' content='Creating new Team Mate for Fluenty Web site'/>
            </Head>
            <CreateTeamMate />
        </LayoutAdmin>

    );
}