import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {redirect} from 'next/navigation';
import {db} from '@/db';
import Dashboard from '@/components/Dashboard';

const DashboardPage = async () => {
    const {getUser} = getKindeServerSession()
    const currentUser = getUser()

    if (!currentUser || !currentUser.id) {
        redirect('/auth-callback?origin=dashboard')
    }

    const databaseUser = await db.user.findFirst({
        where: {
            id: currentUser.id,
        },
    })

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
