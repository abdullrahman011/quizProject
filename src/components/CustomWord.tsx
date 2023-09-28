
'use client'
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import D3WordCloud from "react-d3-cloud"
type Pops = {
    formattedTopics: { text: string; value: number }[];
}



const fontSize = (word: { value: number }) => {
    return Math.log2(word.value) * 5 + 16

}

const CustomWord = ({formattedTopics}: Pops) => {
    const theme = useTheme()
    const router=useRouter()
    return (
        <>
            <D3WordCloud height={550} data={formattedTopics} font="Times"
                fontSize={fontSize} rotate={0} padding={10} onWordClick={(event,word)=>{
                    router.push(`/quiz?topic=${word.text}`)
                }}
                fill={theme.theme == 'dark' ? 'white' : 'black'}
            />
        </>

    )
}
export default CustomWord