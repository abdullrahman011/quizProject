import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SignInButton from '@/components/SignInButton'
import {redirect} from 'next/navigation'
import { getAuthSession } from '@/lib/nextauth'
export default async function Home() {
  const session = await getAuthSession()
  if(session?.user){
return redirect('/dashboard')
  }
  return (

    <div className=' absolute -translate-x-1/2  -translate-y-1/2 top-1/2 left-1/2 right-1/2 text-end'>
      <Card className="w-[300px]" >
       <CardHeader>
        <CardTitle> Quiz  مرحبا بك في موقع    </CardTitle>
        <CardDescription>
          كن على استعداد لتجربة جميلة
        </CardDescription>
       </CardHeader>
       <CardContent>
        <SignInButton text='سجل من هنا '/>
       </CardContent>


      </Card>
    </div>
  )
}
