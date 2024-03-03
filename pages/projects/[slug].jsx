import {
    connectDatabase, getAllDocuments,
    getDocumentIdFind,
    getDocumentIdFindOne
} from "../../helpers/db-utils";
import ProjectDetails from "../../components/Projects/ProjectDetails";
import {Fragment} from "react";
import Head from "next/head";

export default function ProjectsDetails({projects, selectedProject}) {
    return (
        <Fragment>
            <Head>
                <title>Fluenty Projects</title>
                <meta name='description' content='Projects Fluenty working on'/>
            </Head>
            <ProjectDetails projects={projects} project={selectedProject} />
        </Fragment>
    );
}


export async function getStaticPaths() {
    const client = await connectDatabase();

    const projects = await getDocumentIdFind(client, process.env.mongodb_database, process.env.mongodb_database_projects)

    const paths = projects.map((project) => ({
        params: {slug: project._id.toString()},
    }));

    client.close();

    return {
        fallback: 'blocking',
        paths: paths,

    };
}

export async function getStaticProps(context) {

    try {
        const client = await connectDatabase();

        const projects = await getAllDocuments(client, process.env.mongodb_database, process.env.mongodb_database_projects, { _id: -1 });

// Extract only the necessary data for serialization
        const serializedProjects = projects.map((project, index) => ({
            // Assuming _id is a string, if not, replace it with the appropriate property
            index: index,
            id: project._id.toString(),
            title: project.title,
            image: project.pickedImage.src,
            category: project.category,
            challenge: project.challenge,
            client: project.client,
            date: project.date,
            location: project.location,
            results: project.results,
            slug: project.title.trim().replace(/\s+/g, "-")
            // Include other necessary fields here
        }));

        // fetch data for a single meetup
        const projectSlug = context.params.slug;

        const projectId = projectSlug.replace(/-/g, " ");

        if (!projectId) {
            throw new Error("Service ID is missing");
        }

        const project = await getDocumentIdFindOne(client, process.env.mongodb_database, process.env.mongodb_database_projects, {title: projectId})

        client.close();

        if (!project) {
            throw new Error("Service not found");
        }

        return {
            props: {
                projects: serializedProjects,
                selectedProject: {
                    id: project._id.toString(),
                    title: project.title,
                    image: project.pickedImage.src,
                    category: project.category,
                    challenge: project.challenge,
                    client: project.client,
                    date: project.date,
                    location: project.location,
                    results: project.results,
                },
            },
            revalidate: 30
        };
    } catch (error) {
        console.error("Error fetching service:", error);
        return {
            notFound: true,
        };
    }
}
