import { Question } from '@prisma/client'
import { Table } from 'lucide-react'
import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { cn } from '@/lib/utils'

type Props = {
    questions: Question[]
}

const QuestionsList = ({ questions }: Props) => {
    let gameType = questions[0].questionType
    return (
        <Table className='mt-4'>
            <TableCaption>End of list</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[10px]'>No</TableHead>
                    <TableHead>question correct </TableHead>
                    <TableHead>your answer correct </TableHead>\
                    {gameType === 'open_ended' && (
                        <TableHead className='w-[10px] text-right'>accuracy</TableHead>
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>
                <>
                    {questions.map((question, index) => {
                        return (
                            <TableRow key={question.id}>
                                <TableCell className=' font-medium'>{index + 1}</TableCell>
                                <TableCell>{question.question}
                                    <br />
                                    <br />
                                    <span className=' font-semibold'>{question.answar}</span>
                                </TableCell>
                                {gameType === 'mcq' && (
                                    <TableCell className={cn({
                                        'text-green-600': question.isCorrect,
                                        'text-red-600': !question.isCorrect
                                    })}>
                                        {question.userAnswer}
                                    </TableCell>
                                )}
                                {gameType === 'open_ended' && (

                                    <TableCell>{question.userAnswer}</TableCell>
                                )}
                                {gameType === 'open_ended' && (
                                    <TableCell className='text-right'>
                                        {question.percentageCorrect}
                                    </TableCell>
                                )}
                            </TableRow>

                        )


                    })}
                </>
            </TableBody>

        </Table>
    )
}

export default QuestionsList