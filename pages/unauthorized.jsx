import React, {Fragment} from 'react';
import Head from "next/head";

export default function Unauthorized() {
    return (
        <Fragment>
            <Head>
                <title>Fluenty Unauthorized</title>
                <meta name='description' content='User are not authorized to access that page'/>
            </Head>
            <div className='center'>
                <h1>You are not authorized to access that page!!!</h1>
            </div>
        </Fragment>

    );
}
