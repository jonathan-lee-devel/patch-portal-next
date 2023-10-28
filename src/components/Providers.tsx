'use client'

import {PropsWithChildren, ReactNode, useState} from 'react';
import {QueryClient} from '@tanstack/query-core';
import {trpc} from '@/app/_trpc/client';
import {httpBatchLink} from '@trpc/client';
import {QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from "next-themes";

const Providers = ({children, url}: { children: ReactNode, url: string }) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({url}),
        ],
    }))

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider attribute={'class'} defaultTheme={'system'} enableSystem>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default Providers
