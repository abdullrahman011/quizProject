import { getAuthSession } from "@/lib/nextauth"
import React from "react"
import { redirect } from 'next/navigation'
import QuizMeCard from "@/components/Dashboard/QuizMeCard"
import HistoryCard from "@/components/Dashboard/HistoryCard"
import HotTopicsCard from "./HotTopicsCard"
import RecentActivites from "./RecentActivites"

type Props = {}

export const metadata = {
    title: "Dashboard"
}

const Dashboard = async (props: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect('/')
    }
    return (
        <main className="p-8 mx-auto max-w-7xl   ">
            <div className=" flex items-center justify-end ">
                <h1 className=" text-4xl ">الرئيسية</h1>
            </div>
            <div className="  grid gap-4 mt-4 md:grid-cols-2  ">
                <QuizMeCard />
                <HistoryCard />
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7 ">
                <HotTopicsCard />
                <RecentActivites/>
            </div>




        </main>
    )
}
export default Dashboard