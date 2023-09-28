import {z} from "zod"


export const QuizCreationSchema =z.object({

    topic:z.string().min(4,{message:"العنوان يجب ان يكون اعلى من 4 احرف"}).max(58),
    type:z.enum(["mcq" ,"open_ended"]),
    amount:z.number().min(1).max(10),
})
export const checkAnswerSchema=z.object({
questionId:z.string(),
userAnswer:z.string(),

})