import {
    connectDatabase,
    getDocumentIdFind,
    getDocumentIdFindOne
} from "../../helpers/db-utils";
import ProjectDetails from "../../components/Projects/ProjectDetails";

export default function ProjectsDetails({selectedProject}) {
    return (
        <div>
            <ProjectDetails project={selectedProject} />
        </div>
    );
}


export async function getStaticPaths() {
    const client = await connectDatabase();

    const projects = await getDocumentIdFind(client, 'Fluenty', 'fluenty-dev-projects')

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
        // fetch data for a single meetup
        const projectSlug = context.params.slug;

        const projectId = projectSlug.replace(/-/g, " ");

        if (!projectId) {
            throw new Error("Service ID is missing");
        }

        const client = await connectDatabase();

        const project = await getDocumentIdFindOne(client, 'Fluenty', 'fluenty-dev-projects', {title: projectId})

        client.close();

        if (!project) {
            throw new Error("Service not found");
        }

        return {
            props: {
                selectedProject: {
                    id: project._id.toString(),
                    title: project.title,
                    image: project.image,
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
