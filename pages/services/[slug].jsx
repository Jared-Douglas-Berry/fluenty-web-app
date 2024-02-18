import {
    connectDatabase,
    getDocumentIdFind,
    getDocumentIdFindOne
} from "../../helpers/db-utils";
import ServiceDetails from "../../components/Services/ServiceDetails";

export default function ServicesDetails({selectedService}) {
    return (
        <div>
            <ServiceDetails service={selectedService}/>
        </div>
    );
}


export async function getStaticPaths() {
    const client = await connectDatabase();

    const services = await getDocumentIdFind(client, 'Fluenty', 'fluenty-dev-services')

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

        const service = await getDocumentIdFindOne(client, 'Fluenty', 'fluenty-dev-services', {title: serviceId})

        client.close();

        if (!service) {
            throw new Error("Service not found");
        }

        return {
            props: {
                selectedService: {
                    id: service._id.toString(),
                    title: service.title,
                    icon: service.icon,
                    image: service.image,
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
