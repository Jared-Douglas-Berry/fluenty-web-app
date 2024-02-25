import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Link from "next/link";
import Creating from "../../../components/Buttons/Creating";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";

export default function AdminProjects() {
    return (
        <LayoutAdmin>
            <h1>Projects</h1>
            <p>Configure your admin Projects here.</p>
            <Link href='/admin/projects/create-project'>
                <Creating isLoading={false} bntText="Create Project"/>
            </Link>
            <p>Configure your admin Projects here.</p>
            <DynamicTable apiEndpoint='/api/admin/createProject' createPageUrl='/admin/projects/create-project'/>
        </LayoutAdmin>
    );
}