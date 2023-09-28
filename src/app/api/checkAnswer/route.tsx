import { prisma } from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { compareTwoStrings } from "string-similarity";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { questionId, userAnswer } = checkAnswerSchema.parse(body)
        const question = await prisma.question.findUnique({
            where: { id: questionId }
        })
        if (!question) {
            return NextResponse.json(
                {
                    error: "لا يوجد اسألة"

                },
                {
                    status: 404,
                }
            )
        }
        await prisma.question.update({
            where: { id: questionId },
            data: {
                userAnswer
            }
        });
        if (question.questionType === "mcq") {
            const isCorrect = question.answar.toLowerCase().trim() == userAnswer.toLowerCase().trim()
            await prisma.question.update({
                where: { id: questionId },
                data: { isCorrect }
            })
            return NextResponse.json({
                isCorrect
            },
                {
                    status: 200
                })

        } else if (question.questionType === 'open_ended') {
            let percetertageSimilar = compareTwoStrings(userAnswer.toLowerCase().trim(), question.answar.toLowerCase().trim())
            percetertageSimilar = Math.round(percetertageSimilar * 100)
            await prisma.question.update({
                where: { id: questionId },
                data: { percentageCorrect: percetertageSimilar }
            })
            return NextResponse.json(
                {
                percetertageSimilar

            }, { status: 200 }
            )

        }
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({

                error: error.issues,
            }, {
                status: 400,
            })

        }
    }


}