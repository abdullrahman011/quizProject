import CustomWord from "@/components/CustomWord";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import React from "react";
type Props = {}
const HotTopicsCard = async (props: Props) => {

    const topics = await prisma.topicCount.findMany({})
    const formattedTopics = topics.map(topic => {
        return{
            text: topic.topic,
            value:topic.count,
            

        }
        
    })
    return (
        <Card className=" col-span-4">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">

                </CardTitle>
                <CardDescription>
                    اضغط على الكلمات لبدأ الاختبار
                </CardDescription>

            </CardHeader>
            <CardContent className="pl-2">
                <CustomWord formattedTopics={formattedTopics}/>
            </CardContent>

        </Card>
    )

}
export default HotTopicsCard