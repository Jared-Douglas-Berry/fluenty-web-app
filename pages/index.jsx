import { Fragment } from "react";
import Head from "next/head";
import {connectDatabase, getFeturedDocs} from "../helpers/db-utils";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import('../components/Banner/Banner.jsx'));
const AllServices = dynamic(() => import('../components/Services/AllServices.jsx'));
const ScrollingBanner = dynamic(() => import('../components/Banner/ScrollingBanner'));
const AllTechStacks = dynamic(() => import('../components/TechStacks/AllTechStacks'));
const AllProjects = dynamic(() => import('../components/Projects/AllProjects'));
const WholeTeam = dynamic(() => import('../components/Team/WholeTeam'));
const ContactUs = dynamic(() => import('../components/ContactUs/ContactUs'));
const About = dynamic(() => import('../components/About/About'));
const AllBlogs = dynamic(() => import('../components/Blogs/AllBlogs'));

export default function HomePage({services, techStacks, projects, team, options, blogs}) {
    // testing the actions on GitHub
    return (
        <Fragment>
            <Head>
                <title>Welcome to Fluenty</title>
                <meta name='description' content='Fluenty Development'/>
            </Head>

                <Banner/>

            <section className='pageSpace' id="home">
                <About/>
            </section>


            <section className='pageSpace' id="services">
                <AllServices services={services}/>
            </section>
            <ScrollingBanner items={services}/>

            <section className='pageSpace'>
                <AllTechStacks techStacks={techStacks}/>
            </section>

            <section className='pageSpace' id="projects">
                <AllProjects projects={projects}/>
            </section>

            <section className='pageSpace' id="team">
                <WholeTeam team={team}/>
            </section>

            <section className='pageSpace' id="blogs">
                <AllBlogs blogs={blogs}/>
            </section>

            <section className='pageSpace'>
                {options && options.length > 0 && (
                    <ContactUs options={options[0]?.subjects || []} />
                )}
            </section>

        </Fragment>
    );
}

export async function getStaticProps() {
    const client = await connectDatabase();

    const services = await getFeturedDocs(client, process.env.mongodb_database, process.env.mongodb_database_services, { _id: -1 })

    // Extract only the necessary data for serialization
    const serializedServices = services.map(service => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: service._id.toString() || null,
        title: service.title || null,
        image: service.pickedImage1.src || null,
        icon: service.pickedImage.src || null,
        isFeatured: service.isFeatured || false,
        slug: service.title.trim().replace(/\s+/g, "-") || null
        // Include other necessary fields here
    }));

    const techStacks = await getFeturedDocs(client, process.env.mongodb_database, process.env.mongodb_database_tech, { _id: -1 })

    // Extract only the necessary data for serialization
    const serializedTechStacks = techStacks.map(techStack => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: techStack._id.toString() || null,
        title: techStack.title || null,
        icon: techStack.pickedImage.src || null,
        isFeatured: techStack.isFeatured || false,
        // Include other necessary fields here
    }));

    const projects = await getFeturedDocs(client, process.env.mongodb_database, process.env.mongodb_database_projects, { _id: -1 });

// Extract only the necessary data for serialization
    const serializedProjects = projects.map((project, index) => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: project._id.toString() || null,
        index: index || null,
        title: project.title || null,
        image: project.pickedImage.src || null,
        category: project.category || null,
        challenge: project.challenge || null,
        client: project.client || null,
        date: project.date || null,
        location: project.location || null,
        results: project.results || null,
        isFeatured: project.isFeatured || false,
        slug: project.title.trim().replace(/\s+/g, "-") || null
        // Include other necessary fields here
    }));

    const team = await getFeturedDocs(client, process.env.mongodb_database, process.env.mongodb_database_team, { _id: -1 });

// Extract only the necessary data for serialization
    const serializedTeam = team.map((teamMate, index) => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: teamMate._id.toString() || null,
        index: index || null,
        firstName: teamMate.firstName || null,
        lastName: teamMate.lastName || null,
        jobTitle: teamMate.jobTitle || null,
        email: teamMate.email || null,
        phone: teamMate.phone || null,
        location: teamMate.location || null,
        linkin: teamMate.linkin || null,
        facebook: teamMate.facebook || null,
        twitter: teamMate.twitter || null,
        instagram: teamMate.instagram || null,
        middleName: teamMate.middleName || null,
        summary: teamMate.summary || null,
        image: teamMate.pickedImage.src || null,
        experience: teamMate.experience || null,
        isFeatured: teamMate.isFeatured || false,
        slug: `${teamMate.firstName} ${teamMate.middleName ? teamMate.middleName + ' ' : ''} ${teamMate.lastName}`.trim().replace(/\s+/g, "-")  || null
        // Include other necessary fields here
    }));

    const options = await getFeturedDocs(client, process.env.mongodb_database, process.env.mongodb_database_email_subjects, { _id: 1 });

// Extract only the necessary data for serialization
    const serializedOptions = options.map((option) => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        _id: option._id.toString() || null,
        subjects: option.subjects || null,
        modifiedDate: option.modifiedDate.toISOString() || null,
        createdDate: option.createdDate.toISOString() || null,
        isFeatured: option.isFeatured || false,
        // Include other necessary fields here
    }));

    const blogs = await getFeturedDocs(client, process.env.mongodb_database, process.env.mongodb_database_blog, { _id: -1 });

// Extract only the necessary data for serialization
    const serializedBlogs = blogs.map((blog, index) => ({
        // Assuming _id is a string, if not, replace it with the appropriate property
        index: index || null,
        id: blog._id.toString() || null,
        author: blog.author || null,
        title: blog.title || null,
        paragraphOne: blog.paragraphOne || null,
        paragraphTwo: blog.paragraphTwo || null,
        paragraphThree: blog.paragraphThree || null,
        pickedImage: blog.pickedImage.src || null,
        image: blog.pickedImage1.src || null,
        pickedImage2: blog.pickedImage2.src || null,
        modifiedDate: blog.modifiedDate.toISOString() || null,
        createdDate: blog.createdDate.toISOString() || null,
        isFeatured: blog.isFeatured || false,
        slug: blog.title.trim().replace(/\s+/g, "-") || null
        // Include other necessary fields here
    }));

    return {
        props: {
            services: serializedServices,
            techStacks: serializedTechStacks,
            projects: serializedProjects,
            team: serializedTeam,
            options: serializedOptions,
            blogs: serializedBlogs
        },
        // revalidate: 1800,
    };
}
