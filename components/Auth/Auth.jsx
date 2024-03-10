import {getSession, useSession} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Auth = ({ children }) => {
    const {data: session, status, update} = useSession();
    const router = useRouter();

    console.log('Session in Auth:', session);

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while session is loading
        // Check if the session is expired
        const expirationTime = session?.token.token.exp * 1000; // Convert expiration time to milliseconds
        const currentTime = new Date().getTime();
        if (currentTime > expirationTime) {
            if (!session || !session?.token.token.user) {
                if (!isAdmin(session?.token.token.user)) {
                    router.push('/auth');
                    return; // Redirect to login page if user is not authenticated
                }

            }
        }


    }, [session, status, router]);


    if (status === 'loading') {
        return <div>Loading...</div>; // Show loading indicator while session is being fetched
    }

    return children;
};

const isAdmin = (user) => {
    console.log("isAdmin", user)
    // Assuming user object has a 'role' field indicating the user's role
    return user.role === 'admin';
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    console.log('Session in getServerSideProps:', session);

    if (!session) {
        // Redirect to login if user is not authenticated
        return {
            redirect: {
                destination: '/auth',
            },
        };
    }

    // Pass session data to the page
    return {
        props: { session }, // Pass session data as sessionServer prop
    };
}

export default Auth;