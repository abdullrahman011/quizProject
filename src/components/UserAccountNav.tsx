'use client'
import {PiSignOutBold} from "react-icons/pi"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";

type Props = {
    user: Pick<User, "name" | "image" | "email">

};

const UserAccountNav = ({ user }: Props) => {
    return (

        <DropdownMenu >
            <DropdownMenuTrigger className="  ">
           <UserAvatar user={user}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-white " align="end">
                <div className="flex items-center justify-start gap-2 p-2 ">
                    <div className=" flex flex-col space-y-1 leading-none ">
                        {user.name && <p className=" font-medium"> {user.name} </p>}

                        {user.email && (
                            <p className=" w-[200px] truncate text-sm text-zinc-700">{user.email}</p>

                        )}
                    </div>

                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-end mb-2">

                    <Link href="/" className=" ">الرئيسية</Link>


                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault()
                    signOut().catch(console.error)
                }} className="text-red-600 cursor-pointer gap-2  justify-end flex ">
                   
                   <p>تسجيل خروج</p>
                   <PiSignOutBold />
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )





}
export default UserAccountNav