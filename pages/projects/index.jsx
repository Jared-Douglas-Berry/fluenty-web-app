import {Fragment} from "react";
import AllProjects from "../../components/Projects/AllProjects";
import {connectDatabase, getAllDocuments} from "../../helpers/db-utils";

export default function Projects({projects}) {
    return (
        <Fragment>
            <AllProjects projects={projects} />
        </Fragment>
    );
}

export async function getStaticProps() {
    const client = await connectDatabase();

    const projects = await getAllDocuments(client, 'Fluenty', 'fluenty-dev-projects', { _id: -1 });

// Extract only the necessary data for serialization
    const serializedProjects = projects.map((project, index) => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: project._id.toString(),
        index: index,
        title: project.title,
        image: project.image,
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