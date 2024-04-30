import {connectDatabase, getDocumentIdFind, getDocumentIdFindOne} from "../../helpers/db-utils";
import {Fragment} from "react";
import TeamMateDetails from "../../components/Team/TeamMateDetails";
import Head from "next/head";

export default function TeamMate({selectedTeamMate}) {

    return (
        <Fragment>
            <Head>
                <title>Fluenty Team Mates</title>
                <meta name='description' content='Fluenty Amazing team members'/>
            </Head>
            <TeamMateDetails teamMate={selectedTeamMate} />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await connectDatabase();

    const team = await getDocumentIdFind(client, process.env.mongodb_database, process.env.mongodb_database_team)

    const paths = team.map((teamMate) => ({
        params: {slug: teamMate._id.toString()},
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

        const slugParts = serviceSlug.split("-");

        if (!slugParts) {
            throw new Error("Service ID is missing");
        }

        const client = await connectDatabase();

        const teamMate = await getDocumentIdFindOne(client, process.env.mongodb_database, process.env.mongodb_database_team, {firstName: slugParts[0], middleName: slugParts[1], lastName: slugParts[2]})

        client.close();

        if (!teamMate) {
            throw new Error("Service not found");
        }

        return {
            props: {
                selectedTeamMate: {
                    _id: teamMate._id.toString(),
                    firstName: teamMate.firstName,
                    lastName: teamMate.lastName,
                    jobTitle: teamMate.jobTitle,
                    email: teamMate.email,
                    phone: teamMate.phone,
                    location: teamMate.location,
                    linkin: teamMate.linkin,
                    facebook: teamMate.facebook,
                    twitter: teamMate.twitter,
                    instagram: teamMate.instagram,
                    middleName: teamMate.middleName,
                    summary: teamMate.summary,
                    image: teamMate.pickedImage.src,
                    experience: teamMate.experience,
                    isFeatured: teamMate.isFeatured,
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