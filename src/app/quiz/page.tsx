
import React from "react";

import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import QuizCreation from "@/components/QuizCreation";

type Pops = {
    searchParams:{
        topic?:string;
    }
}

export const metadata = {
    title: "Quiz Page",
}

const QuizPage = async ({searchParams}: Pops) => {
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect('/')

    }

    return <QuizCreation topic={searchParams.topic ?? ""} />;
}
export default QuizPage