import ContactUs from "../../components/ContactUs/ContactUs";
import Head from "next/head";
import {Fragment} from "react";

export default function ContactUsPage() {
    return (
        <Fragment className='center'>
            <Head>
                <title>Fluenty Contact us</title>
                <meta name='description' content='Fluenty Contact us about you next project'/>
            </Head>
            <ContactUs />
        </Fragment>
    );
}