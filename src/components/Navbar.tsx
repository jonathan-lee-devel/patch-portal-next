import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import {
    LoginLink,
    RegisterLink,
    getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import {ThemeToggle} from '@/components/ThemeToggle';

const Navbar = () => {
    const { getUser } = getKindeServerSession()
    const currentUser = getUser()

    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link
                        href='/'
                        className='flex z-40 font-semibold'>
                        <span>PatchPortal</span>
                    </Link>
                    <ThemeToggle />

                    <MobileNav isAuth={!!currentUser} />

                    <div className='hidden items-center space-x-4 sm:flex'>
                        {!currentUser ? (
                            <>
                                <LoginLink
                                    className={buttonVariants({
                                        variant: 'ghost',
                                        size: 'sm',
                                    })}>
                                    Sign in
                                </LoginLink>
                                <RegisterLink
                                    className={buttonVariants({
                                        size: 'sm',
                                    })}>
                                    Register{' '}
                                    <ArrowRight className='ml-1.5 h-5 w-5' />
                                </RegisterLink>
                            </>
                        ) : (
                            <>
                                <Link
                                    href='/dashboard'
                                    className={buttonVariants({
                                        variant: 'ghost',
                                        size: 'sm',
                                    })}>
                                    Dashboard
                                </Link>

                                <UserAccountNav
                                    name={
                                        !currentUser.given_name || !currentUser.family_name
                                            ? 'Your Account'
                                            : `${currentUser.given_name} ${currentUser.family_name}`
                                    }
                                    email={currentUser.email ?? ''}
                                    imageUrl={currentUser.picture ?? ''}
                                />
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar
