import { Fragment } from "react";
import Head from "next/head";
import Banner from "../components/Banner/Banner.jsx";
import AllServices from "../components/Services/AllServices.jsx";
import {connectDatabase, getAllDocuments} from "../helpers/db-utils";
import ScrollingBanner from "../components/Banner/ScrollingBanner";
import AllTechStacks from "../components/TechStacks/AllTechStacks";
import AllProjects from "../components/Projects/AllProjects";
import WholeTeam from "../components/Team/WholeTeam";
import ContactUs from "../components/ContactUs/ContactUs";
import About from "../components/About/About";

export default function HomePage({services, techStacks, projects, team}) {
    return (
        <Fragment>
            <Head>
                <title>Welcome to Fluenty</title>
                <meta name='description' content='Fluenty Development'/>
            </Head>

            <Banner/>

            <section id="home">
                <About />
            </section>

            <section id="services">
                <AllServices services={services}/>
                <ScrollingBanner items={services}/>
            </section>

            <section>
                <AllTechStacks techStacks={techStacks}/>
            </section>

            <section id="projects">
                <AllProjects projects={projects}/>
            </section>

            <section id="team">
                <WholeTeam team={team}/>
            </section>

            <section>
                <h2>Blog</h2>
            </section>

            <section>
                <ContactUs />
            </section>

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
        image: service.image,
        icon: service.icon,
        slug: service.title.trim().replace(/\s+/g, "-")
        // Include other necessary fields here
    }));

    const techStacks = await getAllDocuments(client, process.env.mongodb_database, process.env.mongodb_database_tech, { _id: -1 })

    // Extract only the necessary data for serialization
    const serializedTechStacks = techStacks.map(techStack => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: techStack._id.toString(),
        title: techStack.title,
        icon: techStack.icon,
        // Include other necessary fields here
    }));

    const projects = await getAllDocuments(client, process.env.mongodb_database, process.env.mongodb_database_projects, { _id: -1 });

// Extract only the necessary data for serialization
    const serializedProjects = projects.map((project, index) => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: project._id.toString(),
        index: index,
        title: project.title,
        image: project.image,
        category: project.category,
        challenge: project.challenge,
        client: project.client,
        date: project.date,
        location: project.location,
        results: project.results,
        slug: project.title.trim().replace(/\s+/g, "-")
        // Include other necessary fields here
    }));

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
        image: teamMate.image,
        experience: teamMate.experience,
        slug: `${teamMate.firstName} ${teamMate.middleName ? teamMate.middleName + ' ' : ''} ${teamMate.lastName}`.trim().replace(/\s+/g, "-")
        // Include other necessary fields here
    }));

    return {
        props: {
            services: serializedServices,
            techStacks: serializedTechStacks,
            projects: serializedProjects,
            team: serializedTeam,
        },
        revalidate: 1800,
    };
}
