import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {redirect} from 'next/navigation';
import Dashboard from '@/components/Dashboard';
import User from "@/models/User";
import dbConnect from "@/lib/db-connect";

const DashboardPage = async () => {
    const {getUser} = getKindeServerSession()
    const currentUser = getUser()

    if (!currentUser || !currentUser.id) {
        redirect('/auth-callback?origin=dashboard')
    }

    await dbConnect()
    const databaseUser = await User.findOne({id: currentUser.id}).exec()

    if (!databaseUser) {
        redirect('/auth-callback?origin=dashboard')
    }

    return (
        <>
            <MaxWidthWrapper>
                <Dashboard />
            </MaxWidthWrapper>
        </>
    )
}

export default DashboardPage
