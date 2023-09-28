import { NextResponse } from "next/server"

import { QuizCreationSchema } from './../../../schemas/form/quiz';
import { ZodError, array } from "zod";
import { strict_output } from "@/lib/gpt";


export const POST = async (req: Request, res: Response) => {
    try {
            // const session=await getAuthSession()
            // if(!session?.user){
            //     return NextResponse.json(
            //         {error:"يلزم تسجيل الدخول",
                    
            //         },
            //         {
            //             status:401,
            //         }
            //     )
            // }

        const body = await req.json();
        const { amount, topic, type } = QuizCreationSchema.parse(body)
        let questions: any;
        if (type === 'open_ended') {

            questions = await strict_output(
                'Your are a helpful AI that is able to generate a pair of questions and answers ,the length of the answer should not exed 15 words,store all the pairs of  answer ans questions in a JSON array',
                new Array(amount).fill(

                    `You are to generate a random hard open-ended questions about ${topic}`

                ),


                {
                    question: "question",
                    answer: "answer with max length of 15 words"

                }

            )

        } else if (type === 'mcq') {

            questions = await strict_output(
                'You are helpful AI that is able to generate mcq questions  and answers  the legth of each answers should not exeed 15 words',
                new Array(amount).fill(
                    `You are to generate a random hard open-ended questions about ${topic}`
                ),
                {
                    question: 'question',
                    answer: 'answer with max length of 15 words',
                    option1:'1st option with max length of 15 words',
                    option2:'2st option with max length of 15 words',
                    option3:'3st option with max length of 15 words',
                }

            )
        }
        return NextResponse.json({

            questions,
        },
            {
                status: 200
            }

        )
    } catch (erorr) {

        if (erorr instanceof ZodError) {
            return NextResponse.json({
                erorr: erorr.issues,

            },
                {

                    status: 400
                }



            )
        }
    }
}  
