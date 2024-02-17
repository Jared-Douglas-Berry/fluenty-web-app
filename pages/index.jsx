import { Fragment } from "react";
import Head from "next/head";
import Banner from "../components/Banner/Banner.jsx";
import AllServices from "../components/Services/AllServices.jsx";
import {connectDatabase, getAllDocuments} from "../helpers/db-utils";
import ScrollingBanner from "../components/Banner/ScrollingBanner";

export default function HomePage({services}) {
    return (
        <Fragment>
            <Head>
                <title>Welcome to Fluenty</title>
                <meta name='description' content='Fluenty Development'/>
            </Head>

            <Banner />

            <section id="home">
                <h2>Home</h2>
            </section>

            <section id="services">
                <AllServices services={services} />
                <ScrollingBanner items={services} />
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

    const services = await getAllDocuments(client, 'Fluenty', 'fluenty-dev', { _id: -1 })

    console.log('services', services);

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

    console.log('services', serializedServices);

    return {
        props: {
            services: serializedServices,
        },
        revalidate: 1800,
    };
}
