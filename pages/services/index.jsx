import AllServices from "../../components/Services/AllServices";
import ScrollingBanner from "../../components/Banner/ScrollingBanner";
import {Fragment} from "react";
import {connectDatabase, getAllDocuments} from "../../helpers/db-utils";
import Head from "next/head";

export default function Services({services}) {
    return (
        <Fragment>
            <Head>
                <title>Fluenty Services</title>
                <meta name='description' content='Services offered by Fluenty'/>
            </Head>
            <AllServices services={services} />
            <ScrollingBanner items={services} />
        </Fragment>
    );
}

export async function getStaticProps() {
    const client = await connectDatabase();

    const services = await getAllDocuments(client, process.env.mongodb_database, process.env.mongodb_database_services, { _id: -1 })

    // Extract only the necessary data for serialization
    const serializedServices = services.map(service => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: service._id.toString(),
        title: service.title,
        image: service.pickedImage1.src,
        icon: service.pickedImage.src,
        slug: service.title.trim().replace(/\s+/g, "-")
        // Include other necessary fields here
    }));

    return {
        props: {
            services: serializedServices,
        },
        // revalidate: 1800,
    };
}