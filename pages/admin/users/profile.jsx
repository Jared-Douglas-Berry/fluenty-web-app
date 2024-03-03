import { getServerSession } from "next-auth/next"
import {authOptions} from "../../api/auth/[...nextauth]";
import UserChangePassword from "../../../components/Users/UserChangePassword";
import LayoutAdmin from "../../../components/Layout/LayoutAdmin";

function ProfilePage() {
  return (
      <LayoutAdmin>
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
