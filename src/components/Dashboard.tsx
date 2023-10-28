import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';

const Dashboard = () => {
    const {getUser} = getKindeServerSession()
    const currentUser = getUser()

    return (
        <>
            <div className={'flex justify-center mt-10'}>
                <h3>Welcome to PatchPortal {currentUser?.given_name}!</h3>
            </div>
        </>
    )
}

export default Dashboard
