'use client'

import {notFound, useRouter, useSearchParams} from 'next/navigation';
import {trpc} from '@/app/_trpc/client';
import {Loader2} from 'lucide-react';

const AuthCallbackPage = () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    const {data, status, error} = trpc.authCallback.useQuery(undefined, {
        retry: true,
        retryDelay: 500,
    })
    if (status === 'success') {
        if (data && data.success) {
            router.push(origin ? `/${origin}`: '/dashboard')
        }
    } else if (status === 'error') {
        if (error?.data?.code === 'UNAUTHORIZED') {
            router.push('/sign-in')
        } else {
            notFound()
        }
    }

    return (
        <>
            <div className={'w-full mt-24 flex justify-center'}>
                <div className={'flex flex-col items-center gap-2'}>
                    <Loader2 className={'h-8 w-8 animate-spin text-zinc-800'}/>
                    <h3 className={'font-semibold text-xl'}>Setting up your account...</h3>
                    <p>You will be redirected automatically</p>
                </div>
            </div>
        </>
    )
}

export default AuthCallbackPage
