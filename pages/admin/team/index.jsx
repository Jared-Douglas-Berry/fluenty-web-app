import LayoutAdmin from "../../../components/Layout/LayoutAdmin";
import Creating from "../../../components/Buttons/Creating";
import Link from "next/link";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";

export default function AdminTeam() {
    return (
        <LayoutAdmin>
            <h1>Team</h1>
            <p>Configure your admin Team here.</p>
            <Link href='/admin/team/create-team'>
                <Creating isLoading={false} bntText="Create Team Mate"/>
            </Link>
            <p>Configure your admin Team here.</p>
            <DynamicTable apiEndpoint='/api/admin/createTeam' createPageUrl='/admin/team/create-team'/>
        </LayoutAdmin>
    );
}