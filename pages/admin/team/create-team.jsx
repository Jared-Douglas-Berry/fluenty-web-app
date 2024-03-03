import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import CreateTeamMate from "../../../components/Team/CreateTeamMate";
import Head from "next/head";

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