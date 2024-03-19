import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";
import dynamic from "next/dynamic";
const CreateTechStack = dynamic(() => import('../../../components/TechStacks/CreateTechStack'));

export default function AdminTechCreate() {
    return (
        <LayoutAdmin>
            <Head>
                <title>Fluenty Admin Tech Stack</title>
                <meta name='description' content='Creating new Tech Stack for Fluenty Web site'/>
            </Head>
            <CreateTechStack />
        </LayoutAdmin>

    );
}