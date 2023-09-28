'use client'
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BrainCircuit } from "lucide-react"
import { useRouter } from "next/navigation"
type Pops = {

}


const QuizMeCard = (pops: Pops) => {
    const router = useRouter();
    return (
        
        <Card className="hover:cursor-pointer hover:opacity-75  " onClick={()=>{
            router.push ("/quiz")}}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 ">
            <BrainCircuit size={30} strokeWidth={2.5} />
                <CardTitle className="text-2xl font-bold">

ابدأ
                </CardTitle>
             

            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground"> ابدأ التحدي الان</p>
            </CardContent>
        </Card>
       
    )

}
export default QuizMeCard