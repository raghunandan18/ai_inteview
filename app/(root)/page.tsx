import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'

const Page = () => {
    return (
        <>
        <section className="card-cta">
            <div className="flex flex-col gap-6 max-w-lg text-center">
                <h2>get interview-ready with AI powered Practice and Feedback</h2>
                    <p className ="text-lg">
                        practice on real intervioew questions, get instant feedback, and improve your skills with every session.
                    </p>
                    <Button asChild className = "btn-primary max-sm:w-full">
                    <Link href ="/interview">Start an Interview</Link>
                    </Button> 
                    </div>
            <Image src="/robot.png" alt="robot" width={800} height={600} className="max-sm:hidden"/>
        </section>
        <section className="flex flex-col gap-6 mt-8">
            <h2>Your interview</h2>
            <div className ="interview-section">    
                {dummyInterviews.map((interview) => (
                    <InterviewCard {...interview} key={interview.id } />
                    ))}
            </div>
        </section>
        <section className="flex flex-col gap-6 mt-8">
            <h2>Take an interview</h2>
            <div className ="interview-section">
                {dummyInterviews.map((interview) => (
                    <InterviewCard {...interview} />
                    ))}
            </div>
        </section>
        </>
    )
}

export default Page
