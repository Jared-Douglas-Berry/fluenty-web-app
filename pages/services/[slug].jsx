import {
    connectDatabase,
    getDocumentIdFind,
    getDocumentIdFindOne
} from "../../helpers/db-utils";
import ServiceDetails from "../../components/Services/ServiceDetails";
import {Fragment} from "react";
import Head from "next/head";

export default function ServicesDetails({selectedService}) {
    return (
        <Fragment>
            <Head>
                <title>Fluenty Services</title>
                <meta name='description' content='Services offered by Fluenty'/>
            </Head>
            <ServiceDetails service={selectedService}/>
        </Fragment>
    );
}


export async function getStaticPaths() {
    const client = await connectDatabase();

    const services = await getDocumentIdFind(client, process.env.mongodb_database, process.env.mongodb_database_services)

    const paths = services.map((service) => ({
        params: {slug: service._id.toString()},
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
        const serviceSlug = context.params.slug;

        const serviceId = serviceSlug.replace(/-/g, " ");

        if (!serviceId) {
            throw new Error("Service ID is missing");
        }

        const client = await connectDatabase();

        const service = await getDocumentIdFindOne(client, process.env.mongodb_database, process.env.mongodb_database_services, {title: serviceId})

        client.close();

        if (!service) {
            throw new Error("Service not found");
        }

        return {
            props: {
                selectedService: {
                    id: service._id.toString(),
                    title: service.title,
                    image: service.pickedImage1.src,
                    icon: service.pickedImage.src,
                    summary: service.summary,
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
