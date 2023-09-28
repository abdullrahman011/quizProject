import { getAuthSession } from "@/lib/nextauth"
import React from "react"
import Link from "next/link"
import SignInButton from './SignInButton'
import UserAccountNav from "./UserAccountNav"
import { ThemeToggle } from "./ThemeToggle"


type props = {}

const Navbar = async (props: props) => {
    const session = await getAuthSession()

    return (<div className=" flexed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b rounded-r-md border-zinc-300 py-2">
        <div className=" flex items-center justify-between h-full gap-2 px-8 mx-auto mx-w-7xl">
            <Link href="/" className="flex items-center gap-2">
                <p className=" rounded-lg border-2 border-b-4 border-r-2 border-black px-2 py-1 text-xl font-bold transition-all hover:translate-y-[5px] md:black dark:border-white">
                    Quiz</p>
            </Link>
            <div className="flex gap-4 items-center">
            <ThemeToggle  />

           
            <div className="flex items-center ">
                {session?.user ? (
                    <UserAccountNav user={session.user} />
                ) : (


                    <SignInButton text='سجل هنا' />
                )}
            </div>


                </div>

            


        </div>

    </div>)
}
export default Navbar