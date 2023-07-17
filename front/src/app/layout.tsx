'use client'

import React from 'react'
import { Inter } from 'next/font/google'
import dynamic from "next/dynamic";
import Providers from "@/provider/providerRedux";
import "@/styles/globals.css"
import {cn} from "../../lib/utils";

const inter = Inter({ subsets: ['latin'] })

const NavBar = dynamic(() => import('@/components/navbar'), {ssr: false})
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body className={cn(inter.className, "max-w-screen-2xl mx-auto min-h-screen")}>
            <Providers>
                    <NavBar />
                    {children}
            </Providers>
            </body>
        </html>
    )
}
