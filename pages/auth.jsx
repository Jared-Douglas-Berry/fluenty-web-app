import {Fragment, useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
const AuthForm = dynamic(() => import('../components/Auth/AuthForm'));
const DNASpinnerLoading = dynamic(() => import('../components/Loader/Loader'));

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchSession = async () => {
      if (session) {
        await router.replace('/admin');
      } else {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [session, router]);

  if (isLoading) {
    return <DNASpinnerLoading styleBtn={'center'} />;
  }

  return (
      <Fragment>
        <Head>
          <title>Fluenty Register</title>
          <meta name='description' content='Fluenty Authotize sign in or sign up page'/>
        </Head>
        <AuthForm />
      </Fragment>

  );
}

export default AuthPage;