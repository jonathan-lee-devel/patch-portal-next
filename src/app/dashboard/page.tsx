import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const DashboardPage = () => {
    const {getUser} = getKindeServerSession()
    const user = getUser()

    return (
        <>
            <MaxWidthWrapper className={'mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'}>
                <h2 className={'max-w-2xl text-2xl font-bold md:text-3xl lg:text-4xl'}>
                    Welcome {user?.given_name}!
                </h2>
            </MaxWidthWrapper>
        </>
    )
}

export default DashboardPage
