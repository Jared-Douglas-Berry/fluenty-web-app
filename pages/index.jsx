import { Fragment } from "react";
import Head from "next/head";

export default function HomePage() {
    return (
        <Fragment>
            <Head>
                <title>Welcome to Fluenty</title>
                <meta name='description' content='Fluenty Development'/>
            </Head>
            <h1>Fluenty Web Site</h1>
            <section id="home">
                <h2>Home</h2>
            </section>
            <section id="services">
                <h2>Services</h2>
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