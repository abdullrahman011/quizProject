'use client'

import { SessionProvider } from "next-auth/react"
import React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const quaryClient=new QueryClient();
const Provider = ({ children, ...props }: ThemeProviderProps) => {

    return (
        <QueryClientProvider client={quaryClient}>

            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                {...props}>

                <SessionProvider>
                    {children}
                </SessionProvider>
            </NextThemesProvider>

        </QueryClientProvider>
    )
}
export default Provider