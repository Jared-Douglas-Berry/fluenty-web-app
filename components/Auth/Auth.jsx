import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Auth = ({ children }) => {
    const {data: session, status, update} = useSession();
    const router = useRouter();

    console.log('AUTH', session)

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while session is loading
        if (!session || !session.user) {
            router.push('/auth');
            // return; // Redirect to login page if user is not authenticated
        }
        // if (!isAdmin(session.user)) {
        //     router.push('/unauthorized');
        //     return; // Redirect to unauthorized page if user is not an admin
        // }
    }, [session, status, router]);


    if (status === 'loading') {
        return <div>Loading...</div>; // Show loading indicator while session is being fetched
    }

    return children;
};

// const isAdmin = (user) => {
//     console.log("isAdmin", user)
//     // Assuming user object has a 'role' field indicating the user's role
//     return user.role === 'admin';
// };

export default Auth;