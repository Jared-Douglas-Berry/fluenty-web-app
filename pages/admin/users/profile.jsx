import { getServerSession } from "next-auth/next"
import {authOptions} from "../../api/auth/[...nextauth]";
import UserChangePassword from "../../../components/Users/UserChangePassword";
import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";

function ProfilePage() {
  return (
      <LayoutAdmin>
          <Head>
              <title>Fluenty User Password</title>
              <meta name='description' content='Updating the user password'/>
          </Head>
        <UserChangePassword />
      </LayoutAdmin>);
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  return {
    props: {
      session,
    },
  }
}

export default ProfilePage;
