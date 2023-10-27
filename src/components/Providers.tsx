'use client'

import {PropsWithChildren, useState} from 'react';
import {QueryClient} from '@tanstack/query-core';
import {trpc} from '@/app/_trpc/client';
import {httpBatchLink} from '@trpc/client';
import {QueryClientProvider} from '@tanstack/react-query';

const Providers = ({children}: PropsWithChildren) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: String(process.env.TRPC_URL!),
            }),
        ],
    }))

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default Providers
