// import { getServerSession } from "next-auth/next"
// import {authOptions} from "../../api/auth/[...nextauth]";
import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Head from "next/head";
import dynamic from "next/dynamic";
const UserChangePassword = dynamic(() => import('../../../components/Users/UserChangePassword'));

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

// export async function getStaticProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions)
//
//   return {
//     props: {
//       session,
//     },
//   }
// }

export default ProfilePage;
