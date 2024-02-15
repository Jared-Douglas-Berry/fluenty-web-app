import { Fragment } from "react";
import Head from "next/head";
import Banner from "../components/Banner/Banner.jsx";
import AllServices from "../components/Services/AllServices.jsx";

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