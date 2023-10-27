import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {cn} from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'PatchPortal',
    description: 'Business-to-Customer communication platform',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang='en' className={'light'}>
        <Providers url={process.env.TRPC_URL!}>
            <body className={cn('min-h-screen font-sans antialiased', inter.className)}>
            <Navbar/>
            {children}
            </body>
        </Providers>
        </html>
    )
}
