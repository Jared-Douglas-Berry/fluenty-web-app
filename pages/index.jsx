import { Fragment } from "react";
import Head from "next/head";
import Banner from "../components/Banner/Banner.jsx";
import AllServices from "../components/Services/AllServices.jsx";
import {connectDatabase, getAllDocuments} from "../helpers/db-utils";
import ScrollingBanner from "../components/Banner/ScrollingBanner";
import AllTechStacks from "../components/TechStacks/AllTechStacks";

export default function HomePage({services, techStacks}) {
    return (
        <Fragment>
            <Head>
                <title>Welcome to Fluenty</title>
                <meta name='description' content='Fluenty Development'/>
            </Head>

            <Banner/>

            <section id="home">
                <h2>Home</h2>
            </section>

            <section id="services">
                <AllServices services={services}/>
                <ScrollingBanner items={services}/>
            </section>

            <section>
                <AllTechStacks techStacks={techStacks} />
            </section>

            <section id="projects">
                <h2>Projects</h2>
            </section>

            <section id="team">
                <h2>Team</h2>
            </section>

            <section>
                <h2>Blog</h2>
            </section>

        </Fragment>
    );
}

export async function getStaticProps() {
    const client = await connectDatabase();

    const services = await getAllDocuments(client, 'Fluenty', 'fluenty-dev-services', { _id: -1 })

    // Extract only the necessary data for serialization
    const serializedServices = services.map(service => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: service._id.toString(),
        title: service.title,
        image: service.image,
        icon: service.icon,
        slug: service.title.trim().replace(/\s+/g, "-")
        // Include other necessary fields here
    }));

    const techStacks = await getAllDocuments(client, 'Fluenty', 'fluenty-dev-tech', { _id: -1 })

    // Extract only the necessary data for serialization
    const serializedTechStacks = techStacks.map(techStack => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: techStack._id.toString(),
        title: techStack.title,
        icon: techStack.icon,
        // Include other necessary fields here
    }));

    return {
        props: {
            services: serializedServices,
            techStacks: serializedTechStacks,
        },
        revalidate: 1800,
    };
}
