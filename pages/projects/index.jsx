import {Fragment} from "react";
import AllProjects from "../../components/Projects/AllProjects";
import {connectDatabase, getAllDocuments} from "../../helpers/db-utils";
import Head from "next/head";

export default function Projects({projects}) {
    return (
        <Fragment>
            <Head>
                <title>Fluenty Projects</title>
                <meta name='description' content='Projects Fluenty working on'/>
            </Head>
            <div className='pageSpace'>
                <AllProjects projects={projects} />
            </div>
        </Fragment>
    );
}

export async function getStaticProps() {
    const client = await connectDatabase();

    const projects = await getAllDocuments(client, process.env.mongodb_database, process.env.mongodb_database_projects, { _id: -1 });

// Extract only the necessary data for serialization
    const serializedProjects = projects.map((project, index) => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: project._id.toString(),
        index: index,
        title: project.title,
        image: project.pickedImage.src,
        slug: project.title.trim().replace(/\s+/g, "-")
        // Include other necessary fields here
    }));

    return {
        props: {
            projects: serializedProjects,
        },
        revalidate: 1800,
    };
}