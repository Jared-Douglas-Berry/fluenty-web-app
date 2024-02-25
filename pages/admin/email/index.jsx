import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import CreateSubjects from "../../../components/Email/CreateSubjects";

export default function AdminEmail() {
    return (
        <LayoutAdmin>
            <h1>Email</h1>
            <p>Configure your admin Email here.</p>
            <CreateSubjects />
        </LayoutAdmin>
    );
}