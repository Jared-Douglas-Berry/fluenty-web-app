import AuthForm from '../components/Auth/AuthForm';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DNASpinnerLoading from "../components/Loader/Loader";

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const cleanup = () => {
      console.log('Component is unmounting');
      // Perform cleanup actions if needed
    };

    return cleanup;
  }, []);

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

  return <AuthForm />;
}

export default AuthPage;