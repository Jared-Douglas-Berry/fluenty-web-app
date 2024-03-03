import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import CreateTechStack from "../../../components/TechStacks/CreateTechStack";
import Head from "next/head";

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