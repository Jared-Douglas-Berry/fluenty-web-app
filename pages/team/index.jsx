import {connectDatabase, getAllDocuments} from "../../helpers/db-utils";
import {Fragment} from "react";
import WholeTeam from "../../components/Team/WholeTeam";

export default function Team({team}) {
    return (
        <Fragment>
            <WholeTeam team={team} />
        </Fragment>
    );
}

export async function getStaticProps() {
    const client = await connectDatabase();

    const team = await getAllDocuments(client, process.env.mongodb_database, process.env.mongodb_database_team, { _id: -1 });

// Extract only the necessary data for serialization
    const serializedTeam = team.map((teamMate, index) => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: teamMate._id.toString(),
        index: index,
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
        slug: `${teamMate.firstName} ${teamMate.middleName ? teamMate.middleName + ' ' : ''} ${teamMate.lastName}`.trim().replace(/\s+/g, "-")
        // Include other necessary fields here
    }));

    return {
        props: {
            team: serializedTeam,
        },
        revalidate: 1800,
    };
}